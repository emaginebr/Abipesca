<#
.SYNOPSIS
    Gera todos os assets PNG para Android e iOS.

.DESCRIPTION
    Script unificado que executa Generate-Android.ps1 e Generate-iOS.ps1
    em sequencia, gerando todos os assets necessarios para ambas plataformas.

.EXAMPLE
    .\Generate-All.ps1
    .\Generate-All.ps1 -InkscapePath "C:\Program Files\Inkscape\bin\inkscape.exe"
#>

param(
    [string]$InkscapePath = ""
)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "============================================" -ForegroundColor Magenta
Write-Host "  ABIPESCA - Geracao de Assets de Design" -ForegroundColor Magenta
Write-Host "============================================" -ForegroundColor Magenta
Write-Host ""

# Parametros para passar adiante
$params = @{}
if ($InkscapePath) {
    $params["InkscapePath"] = $InkscapePath
}

# Gerar Android
Write-Host ">>> ANDROID <<<" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor DarkGray
& (Join-Path $scriptDir "Generate-Android.ps1") @params
Write-Host ""

# Gerar iOS
Write-Host ">>> iOS / iPhone <<<" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor DarkGray
& (Join-Path $scriptDir "Generate-iOS.ps1") @params
Write-Host ""

Write-Host "============================================" -ForegroundColor Magenta
Write-Host "  Todos os assets foram gerados!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Magenta

$designDir = Split-Path -Parent $scriptDir
Write-Host "`nArquivos em:" -ForegroundColor Cyan
Write-Host "  Android: $(Join-Path $designDir 'android')" -ForegroundColor Cyan
Write-Host "  iOS:     $(Join-Path $designDir 'iphone')" -ForegroundColor Cyan
