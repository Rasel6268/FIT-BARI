$proc = Start-Process -FilePath "npx.cmd" -ArgumentList "next dev -p 3000" -PassThru -NoNewWindow
Write-Output "Started Next.js dev server with PID: $($proc.Id)"

# Loop up to 20 seconds waiting for port to answer
$port = 3000
$ready = $false
for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Seconds 1
    try {
        $res = Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing -TimeoutSec 2
        if ($res.StatusCode -eq 200) {
            $port = 3000
            $ready = $true
            break
        }
    } catch {
        try {
            $res2 = Invoke-WebRequest -Uri "http://localhost:3001/" -UseBasicParsing -TimeoutSec 2
            if ($res2.StatusCode -eq 200) {
                $port = 3001
                $ready = $true
                break
            }
        } catch {}
    }
}

if ($ready) {
    Write-Output "Next.js dev server is ACTIVE on http://localhost:$port"
    $routes = @(
        "/",
        "/category/gym-supplements",
        "/category/honey",
        "/shop",
        "/cart"
    )
    foreach ($r in $routes) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:$port$r" -UseBasicParsing -TimeoutSec 10
            Write-Output "GET $r -> HTTP $($response.StatusCode) (Content length: $($response.Content.Length) bytes)"
        } catch {
            Write-Output "GET $r -> Error: $($_.Exception.Message)"
        }
    }
} else {
    Write-Output "Server did not respond within timeout."
}

Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object { $_.StartTime -gt (Get-Date).AddMinutes(-2) } | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Output "Testing complete and test server stopped."
