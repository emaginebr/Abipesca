<#
.SYNOPSIS
    Gera todos os assets PNG para iOS/iPhone a partir dos SVGs fonte.

.DESCRIPTION
    Converte os SVGs em design/source/ para PNGs em todos os tamanhos
    necessarios para o iOS App Icon Set e Launch Screen.
    Requer Inkscape instalado no sistema.

.EXAMPLE
    .\Generate-iOS.ps1
    .\Generate-iOS.ps1 -InkscapePath "C:\Program Files\Inkscape\bin\inkscape.exe"
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
Ou especifique o caminho: .\Generate-iOS.ps1 -InkscapePath "C:\caminho\inkscape.exe"
"@
    exit 1
}

Write-Host "Usando Inkscape: $InkscapePath" -ForegroundColor Green

# Diretorio base
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$designDir = Split-Path -Parent $scriptDir
$sourceDir = Join-Path $designDir "source"
$iphoneDir = Join-Path $designDir "iphone"

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

$combinedSvg = Join-Path $sourceDir "app-icon-combined.svg"
$splashSvg = Join-Path $sourceDir "splash-logo.svg"
$appIconDir = Join-Path $iphoneDir "AppIcon.appiconset"

# ==============================================
# 1. App Icon Set - Todos os tamanhos iOS
# ==============================================
Write-Host "`n=== Gerando App Icon Set ===" -ForegroundColor Yellow

$iconSizes = @(
    @{ Name = "icon-20@2x.png";    Width = 40;   Height = 40 },
    @{ Name = "icon-20@3x.png";    Width = 60;   Height = 60 },
    @{ Name = "icon-29@2x.png";    Width = 58;   Height = 58 },
    @{ Name = "icon-29@3x.png";    Width = 87;   Height = 87 },
    @{ Name = "icon-40@2x.png";    Width = 80;   Height = 80 },
    @{ Name = "icon-40@3x.png";    Width = 120;  Height = 120 },
    @{ Name = "icon-60@2x.png";    Width = 120;  Height = 120 },
    @{ Name = "icon-60@3x.png";    Width = 180;  Height = 180 },
    @{ Name = "icon-76@1x.png";    Width = 76;   Height = 76 },
    @{ Name = "icon-76@2x.png";    Width = 152;  Height = 152 },
    @{ Name = "icon-83.5@2x.png";  Width = 167;  Height = 167 },
    @{ Name = "icon-1024.png";     Width = 1024; Height = 1024 }
)

foreach ($icon in $iconSizes) {
    $outputPath = Join-Path $appIconDir $icon.Name
    Convert-SvgToPng -InputSvg $combinedSvg -OutputPng $outputPath -Width $icon.Width -Height $icon.Height
}

# ==============================================
# 2. Launch Screen (Splash) assets
# ==============================================
Write-Host "`n=== Gerando assets de Launch Screen ===" -ForegroundColor Yellow
$launchDir = Join-Path $iphoneDir "launch"

$launchSizes = @(
    @{ Name = "splash-logo@1x.png"; Width = 128; Height = 128 },
    @{ Name = "splash-logo@2x.png"; Width = 256; Height = 256 },
    @{ Name = "splash-logo@3x.png"; Width = 384; Height = 384 }
)

foreach ($launch in $launchSizes) {
    $outputPath = Join-Path $launchDir $launch.Name
    Convert-SvgToPng -InputSvg $splashSvg -OutputPng $outputPath -Width $launch.Width -Height $launch.Height
}

# ==============================================
# 3. App Store icon (1024x1024)
# ==============================================
Write-Host "`n=== Gerando icone da App Store ===" -ForegroundColor Yellow
$appstoreDir = Join-Path $iphoneDir "appstore"
Convert-SvgToPng -InputSvg $combinedSvg -OutputPng (Join-Path $appstoreDir "app-icon-1024.png") -Width 1024 -Height 1024

Write-Host "`niOS assets gerados com sucesso!" -ForegroundColor Green
Write-Host "Diretorio: $iphoneDir" -ForegroundColor Green
