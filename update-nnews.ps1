# Update NNews libraries
Write-Host "Navigating to NNews directory..." -ForegroundColor Cyan
Set-Location -Path "..\NNews"
Get-Location

Write-Host "Building NNews solution..." -ForegroundColor Yellow
dotnet build -c Release NNews.sln

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error building NNews solution!" -ForegroundColor Red
    Set-Location -Path "..\Abipesca"
    exit 1
}

Write-Host "Navigating to build output..." -ForegroundColor Cyan
Set-Location -Path ".\NNews.ACL\bin\Release\net8.0"
Get-Location

Write-Host "Copying DLL files to Abipesca/Lib..." -ForegroundColor Green
Copy-Item -Path "NNews.ACL.dll" -Destination "..\..\..\..\..\Abipesca\Lib" -Force
Copy-Item -Path "NNews.Dtos.dll" -Destination "..\..\..\..\..\Abipesca\Lib" -Force

Write-Host "NNews libraries updated successfully!" -ForegroundColor Green

# Return to Abipesca directory
Set-Location -Path "..\..\..\..\..\Abipesca"

Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
