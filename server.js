const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.json());

app.post('/consulta', async (req, res) => {
  const { documento } = req.body;
  if (!documento) return res.status(400).json({ error: 'CPF/CNPJ obrigatório' });

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath(), // ESSENCIAL PARA FUNCIONAR NO RENDER
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // segurança no ambiente cloud
    });

    const page = await browser.newPage();
    await page.goto('https://projudi.tjgo.jus.br/');
    await page.waitForTimeout(2000);

    // Simulação: Substituir por scraping real do Projudi
    const resultado = {
      status: 'encontrado',
      processos: [
        { numero: '123456-89.2024.8.09.0001', vara: '2ª Vara Cível' }
      ]
    };

    await browser.close();
    return res.json(resultado);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
