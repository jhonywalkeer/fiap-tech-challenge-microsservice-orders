# Subir o Docker Compose
echo "Iniciando o Docker Compose..."
docker-compose up -d

# Aguardando para os serviços iniciarem
echo "Aguardando 60 segundos para os serviços iniciarem..."
sleep 60

# Executar os testes
echo "Executando os testes..."
npm install
npx cucumber-js

# Parar o Docker Compose
echo "Parando o Docker Compose..."
docker-compose down

# Finalizado
echo "Testes finalizados!"
