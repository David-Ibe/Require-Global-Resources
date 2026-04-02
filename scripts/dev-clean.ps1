$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

function Stop-ListeningOnPort([int]$port) {
  $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
  if (-not $conns) { return }

  $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
  foreach ($pid in $pids) {
    try { Stop-Process -Id $pid -Force -ErrorAction Stop } catch { }
  }
}

function Stop-ProjectNextServers() {
  # Kill any node.exe whose command line contains this repo and Next's dev server.
  $procs = Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
    Where-Object {
      ($_.CommandLine -like "*$projectRoot*") -and
      ($_.CommandLine -like "*next*start-server.js*")
    }

  foreach ($p in $procs) {
    try { Stop-Process -Id $p.ProcessId -Force -ErrorAction Stop } catch { }
  }
}

Stop-ProjectNextServers
Stop-ListeningOnPort 3000

Start-Sleep -Milliseconds 250

Push-Location $projectRoot
try {
  # Ensure we ONLY bind to localhost:3000
  & npx next dev -p 3000 -H localhost
} finally {
  Pop-Location
}

