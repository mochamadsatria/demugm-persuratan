
Set-Item -Path "env:NODE_ENV" -Value "production"

cd buildtools

$url = "https://nodejs.org/dist/v18.16.0/node-v18.16.0-win-x64.zip"
$downloadOutputPath = Join-Path -Path $pwd.Path -ChildPath $(Split-Path -Leaf $url)
Invoke-WebRequest -Uri $url -OutFile $downloadOutputPath

$zipFile = Join-Path -Path $pwd.Path -ChildPath "node-v18.16.0-win-x64.zip"
$extractOutputPath = Join-Path -Path $pwd.Path -ChildPath "node-v18.16.0-win-x64"
Expand-Archive -LiteralPath $zipFile -DestinationPath $extractOutputPath

cd ..

$npm = "./buildtools/node-v18.16.0-win-x64/bin/npm"

& $npm install

& $npm run build

& $npm run start
