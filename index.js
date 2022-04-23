const { val } = require('cheerio/lib/api/attributes');
const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch();
        const url = 'https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html';
        const objeto = [{"Num":"Num",
                "razonSocial":"razonSocial",
                "pais":"pais",
                "datosInscripcion":"datosInscripcion",
                "vigenciaHasta": "vigenciaHasta",
                "datosUltimaActualizacion":"datosUltimaActualizacion",
                "estado":"estado"}]
        try {
            const page = await browser.newPage();
            await page.goto(url);
            const rawData = await page.evaluate(() => {
                let data = [];
                let table = document.getElementById('tabledatasii');
            
                
                for (let i = 1; i < 3; i++) {
                    let objCells = table.rows.item(i).cells;

                    let values = [];
                    let id = i;
                    
                    
                    for (let j = 0; j < objCells.length; j++) {
                        let text = objCells.item(j).innerHTML;
                        values.push(text);
                    }
                    let d = { values };
            
                    data.push(values)
                }
                return data;
            });
            console.log(rawData);
        } catch (error) {
            console.log('error', error);
        }
        await browser.close();
    })();