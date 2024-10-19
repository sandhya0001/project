module.exports = ({ name, email, userId, events }) => {
    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}. ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const receiptNumber = `${userId}-${today.getTime()}`;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PDF Result</title>
        <style>
            body {
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                color: #555;
                background: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .invoice-box {
                width: 100%;
                max-width: 800px;
                margin: 20px auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                background: #fff;
            }
            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
                border-collapse: collapse;
            }
            .invoice-box table td {
                padding: 10px;
                vertical-align: top;
            }
            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }
            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }
            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }
            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }
            .invoice-box table tr.heading td {
                background: #4CAF50;
                color: #fff;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }
            .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
            }
            .invoice-box table tr.item:nth-child(odd) {
                background: #e8f5e9;
            }
            .invoice-box table tr.item:nth-child(even) {
                background: #f9f9f9;
            }
            .invoice-box table tr.item td:nth-child(1) {
                font-weight: bold;
            }
            .invoice-box table tr.item.last td {
                border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #4CAF50;
                font-weight: bold;
                color: #333;
            }
            .highlight {
                background: #f9f9f9;
                border-left: 5px solid #4CAF50;
                padding-left: 10px;
                margin: 10px 0;
            }
            footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <img src="https://res.cloudinary.com/digpfrdcg/image/upload/v1722963038/logo_voirox.png" style="width: 100%; max-width: 100px;" alt="Logo">
                                </td>
                                <td>
                                    Date of Invoice: ${`${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`}
                                    <br>
                                    Email: ${email}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    <div class="highlight">
                                        Customer name: ${name}
                                    </div>
                                </td>
                                <td>
                                    <div class="highlight">
                                        Receipt number: ${receiptNumber}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="heading">
                    <td>Events Name</td>
                    <td>Price</td>
                </tr>
                ${events.map(event => `
                    <tr class="item">
                        <td>${event.event_name}</td>
                        <td>${event.reg_price}</td>
                    </tr>
                `).join('')}
                <tr class="total">
                    <td></td>
                    <td>Total Price: ${events.reduce((total, event) => total + event.reg_price, 0)}</td>
                </tr>
            </table>
            <footer>
                <p>Invoice was created on ${formattedDate}</p>
            </footer>
        </div>
    </body>
    </html>
    `;
};
