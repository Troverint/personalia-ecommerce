import Stock from "../model/StockModels.js";



export const addStock = async (req, res) => {
    try {
     const {name, quantity} = req.body;
        const stock = await Stock.create({
            name,
            quantity
        });
        if(stock){
            res.status(200).json({message: "Stock berhasil ditambahkan", stock});
        }else{
            res.status(404).json({message: "Stock gagal ditambahkan"});
        }
    } catch (error) {
        
    }
}