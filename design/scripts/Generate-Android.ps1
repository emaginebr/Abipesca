<#
.SYNOPSIS
    Gera todos os assets PNG para Android a partir dos SVGs fonte.

.DESCRIPTION
    Converte os SVGs em design/source/ para PNGs em todas as densidades
    Android necessarias (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi).
    Requer Inkscape instalado no sistema.

.EXAMPLE
    .\Generate-Android.ps1
    .\Generate-Android.ps1 -InkscapePath "C:\Program Files\Inkscape\bin\inkscape.exe"
#>

param(
    [string]$InkscapePath = ""
)

$ErrorActionPreference = "Stop"

# Encontrar Inkscape
if (-not $InkscapePath) {
    $possiblePaths = @(
        "C:\Program Files\Inkscape\bin\inkscape.exe",
        "C:\Program Files (x86)\Inkscape\bin\inkscape.exe",
        "$env:LOCALAPPDATA\Programs\Inkscape\bin\inkscape.exe"
    )

    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            $InkscapePath = $path
            break
        }
    }

    if (-not $InkscapePath) {
        $inkscapeCmd = Get-Command "inkscape" -ErrorAction SilentlyContinue
        if ($inkscapeCmd) {
            $InkscapePath = $inkscapeCmd.Source
        }
    }
}

if (-not $InkscapePath -or -not (Test-Path $InkscapePath)) {
    Write-Error @"
Inkscape nao encontrado!
Instale o Inkscape de: https://inkscape.org/release/
Ou via winget: winget install Inkscape.Inkscape
Ou especifique o caminho: .\Generate-Android.ps1 -InkscapePath "C:\caminho\inkscape.exe"
"@
    exit 1
}

Write-Host "Usando Inkscape: $InkscapePath" -ForegroundColor Green

# Diretorio base
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$designDir = Split-Path -Parent $scriptDir
$sourceDir = Join-Path $designDir "source"
$androidDir = Join-Path $designDir "android"

function Convert-SvgToPng {
    param(
        [string]$InputSvg,
        [string]$OutputPng,
        [int]$Width,
        [int]$Height
    )

    $outputDir = Split-Path -Parent $OutputPng
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }

    Write-Host "  Gerando: $OutputPng (${Width}x${Height})" -ForegroundColor Cyan
    & $InkscapePath $InputSvg --export-type=png --export-filename="$OutputPng" --export-width=$Width --export-height=$Height 2>$null
}

# Densidades Android
$densities = @{
    "mdpi"    = 1.0
    "hdpi"    = 1.5
    "xhdpi"   = 2.0
    "xxhdpi"  = 3.0
    "xxxhdpi" = 4.0
}

# ==============================================
# 1. Icones do app (base 48dp)
# ==============================================
Write-Host "`n=== Gerando icones do app ===" -ForegroundColor Yellow
$combinedSvg = Join-Path $sourceDir "app-icon-combined.svg"

foreach ($density in $densities.GetEnumerator()) {
    $size = [math]::Round(48 * $density.Value)
    $dir = Join-Path $androidDir "mipmap-$($density.Key)"
    Convert-SvgToPng -InputSvg $combinedSvg -OutputPng (Join-Path $dir "appicon.png") -Width $size -Height $size
    Convert-SvgToPng -InputSvg $combinedSvg -OutputPng (Join-Path $dir "appicon_round.png") -Width $size -Height $size
}

# ==============================================
# 2. Icone adaptativo - layers (base 108dp)
# ==============================================
Write-Host "`n=== Gerando layers do icone adaptativo ===" -ForegroundColor Yellow
$foregroundSvg = Join-Path $sourceDir "app-icon-foreground.svg"
$backgroundSvg = Join-Path $sourceDir "app-icon-background.svg"

foreach ($density in $densities.GetEnumerator()) {
    $size = [math]::Round(108 * $density.Value)
    $dir = Join-Path $androidDir "mipmap-$($density.Key)"
    Convert-SvgToPng -InputSvg $foregroundSvg -OutputPng (Join-Path $dir "appicon_foreground.png") -Width $size -Height $size
    Convert-SvgToPng -InputSvg $backgroundSvg -OutputPng (Join-Path $dir "appicon_background.png") -Width $size -Height $size
}

# ==============================================
# 3. Icone de notificacao (base 24dp)
# ==============================================
Write-Host "`n=== Gerando icones de notificacao ===" -ForegroundColor Yellow
$notificationSvg = Join-Path $sourceDir "notification-icon.svg"

foreach ($density in $densities.GetEnumerator()) {
    $size = [math]::Round(24 * $density.Value)
    $dir = Join-Path (Join-Path $androidDir "notification") $density.Key
    Convert-SvgToPng -InputSvg $notificationSvg -OutputPng (Join-Path $dir "ic_notification.png") -Width $size -Height $size
}

# ==============================================
# 4. Splash screen logo (288x288)
# ==============================================
Write-Host "`n=== Gerando splash logo ===" -ForegroundColor Yellow
$splashSvg = Join-Path $sourceDir "splash-logo.svg"
$drawableDir = Join-Path $androidDir "drawable"
Convert-SvgToPng -InputSvg $splashSvg -OutputPng (Join-Path $drawableDir "splash_logo.png") -Width 288 -Height 288

# ==============================================
# 5. Play Store assets
# ==============================================
Write-Host "`n=== Gerando assets da Play Store ===" -ForegroundColor Yellow
$playstoreDir = Join-Path $androidDir "playstore"

# App icon 512x512
Convert-SvgToPng -InputSvg $combinedSvg -OutputPng (Join-Path $playstoreDir "app-icon-512.png") -Width 512 -Height 512

# Feature graphic 1024x500
$featureSvg = Join-Path $sourceDir "feature-graphic.svg"
Convert-SvgToPng -InputSvg $featureSvg -OutputPng (Join-Path $playstoreDir "feature-graphic.png") -Width 1024 -Height 500

Write-Host "`nAndroid assets gerados com sucesso!" -ForegroundColor Green
Write-Host "Diretorio: $androidDir" -ForegroundColor Green
