import Order from "../../../model/orders/Orders";

const OrderResolver = {

    Orders: async ({ filter }) => await Order.find(filter),
    createOrder: async ({ order }) => {

        if (!order) {
            throw new Error("no esta llegando la data orden");
        }

        try {
            const newOrder = new Order(order);
            return await newOrder.save();
        } catch (error) {
            console.log(error)
        }
    },

    updateOrder: async ({ order }) => {

        if (!order._id) {
            throw new Error("needed ID to update");
        }

        const currentOrder = await Order.findOne({
            _id: order._id,
        });

        if (!currentOrder) {
            throw new Error("Order doesn't exist");
        }

        try {
            return await Order.findByIdAndUpdate({ _id: order._id }, order, { new: true, });
        } catch (error) {
            console.log(error)
        }
    },

    deleteOrder: async ({ order }) => {

        if (!order._id) {
            throw new Error("needed ID to delete");
        }

        const currentOrder = await Order.findOne({
            _id: order._id,
        });

        if (!currentOrder) {
            throw new Error("Order doesn't exist");
        }

        try {
            await Order.findByIdAndRemove({ _id: order._id }, order);
            return `Order whith code ${order._id} delete`;
        } catch (error) {
            console.log(error);
        }
    },
};
export default OrderResolver;
