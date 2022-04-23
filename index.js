const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch();
        const url = 'https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html';
        try {
            const page = await browser.newPage();
            await page.goto(url);
            const rawData = await page.evaluate(() => {
                const table = document.getElementById("tabledatasii");
                const trLength = table.getElementsByTagName("tr").length;
                const jsonData = [];
                let obj = {};

                const htmlToJSON = (index) => {
                    let tr = table.getElementsByTagName("tr")[index];
                    const td = tr.getElementsByTagName("td");
                    let arr = [].map.call( td, td => {
                        return td.innerHTML;
                    }).join( ',' );
                    const data = arr.split(",");
                    
                    obj = {
                        "numero":data[0]
                        ,"razonSocial":data[1]
                        ,"pais":data[2]
                        ,"datosInscripcion":data[3]
                        ,"vigenciaHasta":data[4]
                        ,"datosUltimaActualizacion":data[5]
                        ,"estado":data[6]
                    };
                    jsonData.push(obj);
                };
                for(let i = 1; i < trLength; i++){
                    htmlToJSON(i);
                }
                return jsonData
            });
            console.log(rawData);
        } catch (error) {
            console.log('error', error);
        }
        await browser.close();
    })();