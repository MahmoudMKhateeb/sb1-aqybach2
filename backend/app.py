import asyncio
from flask import Flask, request, jsonify
from langchain_ollama import OllamaLLM
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.document_loaders import PDFPlumberLoader
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain.prompts import PromptTemplate
from concurrent.futures import ThreadPoolExecutor
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Paths and model setup
folder_path = "chroma_storage"
cached_llm = OllamaLLM(model="aya-expanse")
embedding = FastEmbedEmbeddings()

# Optimized text splitter
text_splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=50)

# Prompt template
raw_prompt = PromptTemplate.from_template(
    """
    <s>[INST] You are a financial advisor specializing in Egyptian banking and finance.
    Provide clear, accurate information about financial products, services, and best practices.
    If you do not have specific information, provide general guidance while noting the limitations. [/INST]</s>
    [INST] {input}
           Context: {context}
           Answer:
    [/INST]
    """
)

# Async embedding for better performance
def embed_chunks_parallel(chunks):
    with ThreadPoolExecutor(max_workers=4) as executor:
        embeddings = list(executor.map(embedding.embed_query, [chunk.page_content for chunk in chunks]))
    return embeddings

@app.route("/ai", methods=["POST"])
def aiPost():
    try:
        query = request.json.get("query", "").strip()
        if not query:
            return jsonify({"error": "No query provided"}), 400
            
        response = cached_llm.invoke(query)
        return jsonify({"answer": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "The requested URL was not found on this server."}), 404

if __name__ == "__main__":
    print("Warming up model...")
    cached_llm.invoke("Warm up the model")
    print("Model ready. Starting server on http://127.0.0.1:8080")
    app.run(host="127.0.0.1", port=8080, debug=True)