'use client';

import { useState } from 'react';

export function useMultiplestepForm(steps: number) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [orders, setOrders] = useState<{ id: number; data: unknown }[]>([]);
    const [orderCount, setOrderCount] = useState(0);

    const nextStep = () => {
        if (currentStepIndex < steps - 1) {
            setCurrentStepIndex((i) => {
                const newIndex = i + 1;
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                return newIndex;
            });
        }
    };

    const previousStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((i) => i - 1);
        }
    };

    const goTo = (index: number) => {
        setCurrentStepIndex(index);
    };

    // Order management functions
    const addOrder = (data: unknown) => {
        setOrders((prevOrders) => [...prevOrders, { id: orderCount + 1, data }]);
        setOrderCount((count) => count + 1);
    };

    const editOrder = (orderId: number, updatedData: unknown) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, data: updatedData } : order
            )
        );
    };

    const deleteOrder = (orderId: number) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    };

    return {
        currentStepIndex,
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps - 1,
        orders, // Array of orders
        orderCount, // Total count of orders
        goTo,
        nextStep,
        previousStep,
        addOrder,
        editOrder,
        deleteOrder,
    };
}
