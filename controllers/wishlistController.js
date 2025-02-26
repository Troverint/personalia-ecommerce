import Wishlist from "../model/wishlistModel";


export const createWishlist = async (req, res) => {
    try {
        const { ProductId, PembeliId } = req.body;
        const wishlist = await Wishlist.create({
            ProductId,
            PembeliId,
        });
        res.status(200).json({ message: "wishlist berhasil ditambahkan", wishlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findAll();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getWishlistById = async (req, res) => {
    const { id } = req.params;
    try {
        const wishlist = await Wishlist.findByPk(id);
        if (!wishlist) {
            res.status(404).json({ error: "wishlist not found" });
        } else {
            res.status(200).json(wishlist);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductId, PembeliId } = req.body;
        const wishlist = Wishlist.update(
            {
                ProductId,
                PembeliId,
            },
            { where: { id } }
        );
        if (wishlist) {
            const updatedWishlist = await Wishlist.findByPk(id);
            res.status(200).json({
                message: "wishlist berhasil diupdate",
                updatedWishlist,
            });
        } else {
            res.status(404).json({ error: "wishlist not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  

export const deleteWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const wishlist = await Wishlist.destroy({ where: { id } });
        if (!wishlist) {
            res.status(404).json({ error: "wishlist not found" });
        } else {
            res.status(200).json({ message: "wishlist berhasil dihapus" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}