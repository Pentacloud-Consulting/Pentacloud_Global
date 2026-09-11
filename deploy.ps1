$PlinkPath = "plink"
$SSHHost = "31.97.207.239"
$SSHUser = "root"
$SSHPass = "Pentacloud@2026"

$commands = @(
    "cd /var/www/pentacloud && git pull origin main",
    "cd /var/www/pentacloud && npm install --production",
    "cd /var/www/pentacloud && npm run build",
    "cd /var/www/pentacloud && pm2 restart pentacloud"
)

Write-Host "=== Pentacloud VPS Deployment ===" -ForegroundColor Cyan
Write-Host "Target: $SSHUser@$SSHHost" -ForegroundColor Yellow
Write-Host ""

# Check if we have OpenSSH with sshpass equivalent
# Try using SSH with batch mode and a password file approach
$tempKeyFile = "$env:TEMP\ssh_deploy_pass.txt"
$SSHPass | Out-File -FilePath $tempKeyFile -Encoding ASCII -NoNewline

foreach ($cmd in $commands) {
    Write-Host "Running: $cmd" -ForegroundColor Green
    $result = & cmd /c "echo y | ssh -o StrictHostKeyChecking=no -o PasswordAuthentication=yes root@31.97.207.239 `"$cmd`" 2>&1"
    Write-Host $result
    Write-Host ""
}

Remove-Item $tempKeyFile -ErrorAction SilentlyContinue
Write-Host "=== Deployment Complete ===" -ForegroundColor Cyan
