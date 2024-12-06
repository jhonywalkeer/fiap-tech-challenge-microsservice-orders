# Subir o Docker Compose
Write-Host "Iniciando o Docker Compose..."
docker-compose up -d

# Aguardando para os serviços iniciarem
Write-Host "Aguardando 60 segundos para os serviços iniciarem..."
Start-Sleep -s 60

# Executar os testes
Write-Host "Executando os testes..."
npm install
npx cucumber-js

# Parar o Docker Compose
Write-Host "Parando o Docker Compose..."
docker-compose down

# Finalizado
Write-Host "Testes finalizados!"
