# backend/main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Permite que o React (rodando na porta 3000 ou 5173) faça requisições para o Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, mude para o domínio real do site
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurações da API PlantNet
PLANTNET_API_URL = "https://my-api.plantnet.org/v2/identify/all"
PLANTNET_API_KEY = "COLOQUE_SUA_CHAVE_AQUI" # Substitua pela sua chave real

@app.post("/api/identify")
async def identify_plant(image: UploadFile = File(...)):
    try:
        contents = await image.read()
        
        files = {
            'images': (image.filename, contents, image.content_type)
        }
        params = {
            'api-key': PLANTNET_API_KEY
        }
        
        # Faz a chamada segura para a PlantNet
        response = requests.post(PLANTNET_API_URL, files=files, params=params)
        response.raise_for_status() 
        
        data = response.json()
        
        if data.get('results'):
            best_match = data['results'][0]
            species_name = best_match['species']['scientificNameWithoutAuthor']
            common_names = best_match['species'].get('commonNames', [])
            score = best_match['score']
            
            return {
                "species": species_name,
                "common_name": common_names[0] if common_names else species_name,
                "confidence": round(score * 100, 2)
            }
        else:
            raise HTTPException(status_code=404, detail="Nenhuma planta identificada.")

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Erro na comunicação com a PlantNet.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Para rodar o servidor, use o comando no terminal: uvicorn main:app --reload