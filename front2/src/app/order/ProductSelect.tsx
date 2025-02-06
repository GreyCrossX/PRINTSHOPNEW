import React, { useEffect, useReducer, useRef } from 'react';
import { CircleArrowLeft } from 'lucide-react';
import { useDebouncedInputValues } from '@/hooks/useDebounceAsync';
import FormWrapper from '@/components/FormWrapper';
import { Input } from '@/components/ui/input';
import { LocalOrder, ProductType } from '@/lib/schemas';

type Props = {
    products: ProductType[];
    setLocalOrder: React.Dispatch<React.SetStateAction<LocalOrder>>;
    setErrors: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
};

interface State {
    productID: number | null;
    variantOptions: Record<number, number | null>;
    customInputs: Record<number, string | null>;
    isOptional: Record<number, boolean>;
    cardCollapse: Record<number, boolean | string>;
    completedVariants: Record<number, boolean>;
}

type Action =
    | { type: 'HANDLE_PRODUCT', payload: { productID: number, variants: number[] } }
    | { type: 'HANDLE_OPTION', payload: { variantID: number, optionID: number, is_optional: boolean } }
    | { type: 'HANDLE_INPUT', payload: { variantID: number, value: string } }
    | { type: 'TOGGLE', payload: { variantID: number } }
    | { type: 'ON_BACK' };

const initialState: State = {
    productID: null,
    variantOptions: {},
    customInputs: {},
    isOptional: {},
    cardCollapse: {},
    completedVariants: {}
};

function reducer(state: State, action: Action) {
    const { type } = action;

    switch (type) {
        case 'HANDLE_PRODUCT': {
            const ID = action.payload.productID;
            const variantIDs = action.payload.variants;

            const updatedState = variantIDs.reduce((acc, variant) => {
                acc.variantOptions[variant] = null;
                acc.customInputs[variant] = null;
                acc.isOptional[variant] = false;
                acc.cardCollapse[variant] = false;
                acc.completedVariants[variant] = false;
                return acc;
            }, {
                variantOptions: { ...state.variantOptions },
                customInputs: { ...state.customInputs },
                isOptional: { ...state.isOptional },
                cardCollapse: { ...state.cardCollapse },
                completedVariants: { ...state.completedVariants },
            });

            return {
                ...state,
                productID: ID,
                ...updatedState,
            };
        }
        case 'HANDLE_OPTION': {
            const { variantID, optionID, is_optional } = action.payload;
            const boolean = is_optional ? false : true;
            return {
                ...state,
                variantOptions: {
                    ...state.variantOptions,
                    [variantID]: optionID
                },
                isOptional: {
                    ...state.isOptional,
                    [variantID]: is_optional
                },
                cardCollapse: {
                    ...state.cardCollapse,
                    [variantID]: boolean
                },
                completedVariants: {
                    ...state.completedVariants,
                    [variantID]: boolean
                }
            };
        }
        case 'HANDLE_INPUT': {
            const { variantID, value } = action.payload;
            return {
                ...state,
                customInputs: {
                    ...state.customInputs,
                    [variantID]: value
                },
                cardCollapse: {
                    ...state.cardCollapse,
                    [variantID]: true
                },
                completedVariants: {
                    ...state.completedVariants,
                    [variantID]: true
                }
            };
        }
        case 'TOGGLE': {
            const { variantID } = action.payload;
            if (state.variantOptions[variantID] !== null) {
                return {
                    ...state,
                    cardCollapse: {
                        ...state.cardCollapse,
                        [variantID]: !state.cardCollapse[variantID],
                    }
                };
            }
            return state;
        }
        case 'ON_BACK': {
            return initialState;
        }
        default:
            return state;
    }
}

const ProductSelect: React.FC<Props> = ({ products, setErrors, setLocalOrder }) => {
    // 1. Hooks and State Initialization
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        inputValues: optionInputValue,
        debouncedValues: debouncedOption,
        setDebouncedValue,
        flushDebounce,
        debouncedKey,
        hasPendingDebounces,
    } = useDebouncedInputValues({}, 2000);

    // 2. Derived State and Utilities
    const backRef = useRef<Record<number, HTMLHeadingElement | null>>({});
    const inputRef = useRef<Record<number, HTMLInputElement | null>>({});
    const prevIsOptional = useRef<Record<number, boolean>>({});

    const order = React.useMemo(() => {
        if (!state.productID) return null;
        return {
            orderId: 0,
            clientID: 0,
            productId: state.productID,
            variantsIDs: Object.entries(state.variantOptions)
                .filter(([, optionID]) => optionID !== null)
                .map(([variantID, optionID]) => ({
                    variant: Number(variantID),
                    option: optionID as number,
                    custom_option_input: state.isOptional[Number(variantID)]
                        ? state.customInputs[Number(variantID)]
                        : null,
                })),
        };
    }, [state.productID, state.variantOptions, state.customInputs, state.isOptional]);

    // 3. Effect Hooks
    // Focus the input if the optional flag changes.
    useEffect(() => {
        const currentOptionalKeys = Object.keys(state.isOptional);
        const changedKey = currentOptionalKeys.find((key) => {
            const numericKey = Number(key);
            const prevValue = prevIsOptional.current[numericKey];
            const currentValue = state.isOptional[numericKey];
            return prevValue !== currentValue;
        });

        if (changedKey) {
            const numericKey = Number(changedKey);
            if (state.isOptional[numericKey] && inputRef.current[numericKey]) {
                inputRef.current[numericKey]?.focus();
            }
        }
        prevIsOptional.current = { ...state.isOptional };
    }, [state.isOptional]);

    // Handle debounced input updates.
    useEffect(() => {
        if (debouncedKey !== null && debouncedOption !== null) {
            const currentStateValue = state.customInputs[debouncedKey];
            if (debouncedOption[debouncedKey] !== currentStateValue) {
                dispatch({
                    type: "HANDLE_INPUT",
                    payload: { variantID: debouncedKey, value: debouncedOption[debouncedKey] },
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedKey, debouncedOption]);

    // Update the local order whenever `order` changes.
    useEffect(() => {
        if (order) {
            setLocalOrder(order);
        }
    }, [order, setLocalOrder]);

    // Validate errors.
    useEffect(() => {
        const obj = state.variantOptions;
        const hasSelectedOptions = !Object.values(obj).includes(null) && Object.keys(obj).length > 0;
        const hasNoPendingDebounces = !hasPendingDebounces;

        // Only set errors to false if we have all options selected AND no pending debounces
        setErrors({ 1: !(hasSelectedOptions && hasNoPendingDebounces) });
    }, [state.variantOptions, hasPendingDebounces, setErrors]);

    // 4. Helper Functions
    const handleInput = (variantID: number, value: string) => {
        setDebouncedValue(variantID, value);
    };

    const sortOptions = (options: { id: number; description: string; is_optional: boolean }[]) => {
        return [...options].sort((a, b) => Number(a.is_optional) - Number(b.is_optional));
    };

    // 5. Return JSX
    return (
        <FormWrapper
            title="Selección de Productos"
            description="Seleccione el producto que desea y podrá elegir entre una variedad de opciones:"
        >
            <div
                className="w-full flex flex-col gap-5 h-[580px] max-h-[45vh] overflow-auto bg-slate-300 rounded-lg p-2"
                aria-label="Product Selection Wrapper"
            >
                {state.productID === null ? (
                    <div aria-label="Product Grid">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="border hover:border-blue-200 hover:bg-slate-300 p-4 rounded cursor-pointer hover:shadow min-h-[100px] bg-slate-200 overflow-hidden"
                                    onClick={() =>
                                        dispatch({
                                            type: 'HANDLE_PRODUCT',
                                            payload: {
                                                productID: product.id,
                                                variants: product.variants.map((v) => v.id),
                                            },
                                        })
                                    }
                                    aria-label={`Select Product: ${product.name}`}
                                >
                                    <h3 className="text-sm font-semibold">{product.name}</h3>
                                    <p className="text-xs text-slate-400">{product.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div aria-label="Variant Selection">
                        <h2
                            className="text-xl text-slate-800 font-semibold mb-4 flex items-center gap-2 cursor-pointer"
                            onClick={() => dispatch({ type: "ON_BACK" })}
                            aria-label="Go Back to Product Grid"
                            ref={(el) => {
                                if (state.productID !== null) {
                                    backRef.current[state.productID] = el;
                                }
                            }}
                        >
                            <CircleArrowLeft />{' '}
                            {products.find((p) => p.id === state.productID)?.name || 'Unknown Product'}:
                        </h2>
                        {products
                            .find((p) => p.id === state.productID)
                            ?.variants.map((variant) => (
                                <div
                                    key={variant.id}
                                    className={`mb-4 border rounded-lg shadow-md shadow-black/20 p-4 m-4 bg-slate-100 ${state.completedVariants[variant.id] && !hasPendingDebounces? 'border-green-500' : 'border-white'
                                        }`}
                                    aria-label={`Variant: ${variant.render_name}`}
                                >
                                    <h3
                                        className={`font-semibold ${state.cardCollapse[variant.id]
                                                ? 'cursor-pointer text-slate-900'
                                                : 'text-slate-800'
                                            }`}
                                        onClick={() =>
                                            dispatch({ type: 'TOGGLE', payload: { variantID: variant.id } })
                                        }
                                        aria-label={`Toggle Collapse for Variant: ${variant.render_name}`}
                                    >
                                        {variant.render_name}
                                    </h3>

                                    {state.cardCollapse[variant.id] && state.variantOptions[variant.id] && (
                                        <p className="text-gray-600 text-sm">
                                            {state.isOptional[variant.id]
                                                ? state.customInputs[variant.id]
                                                : products
                                                    .find((product) => product.id === state.productID)
                                                    ?.variants.find((v) => v.id === variant.id)
                                                    ?.options.find(
                                                        (option) =>
                                                            option.id === state.variantOptions[variant.id]
                                                    )?.description}
                                        </p>
                                    )}

                                    <div className="flex flex-col gap-2" aria-label="Options List">
                                        {sortOptions(variant.options).map(
                                            (option) =>
                                                !state.cardCollapse[variant.id] && (
                                                    <label
                                                        key={option.id}
                                                        className="flex items-center gap-2 cursor-pointer text-slate-700"
                                                        aria-label={`Option: ${option.description}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`variant-${variant.id}`}
                                                            value={option.id}
                                                            checked={state.variantOptions[variant.id] === option.id}
                                                            onChange={() =>
                                                                dispatch({
                                                                    type: 'HANDLE_OPTION',
                                                                    payload: {
                                                                        variantID: variant.id,
                                                                        optionID: option.id,
                                                                        is_optional: option.is_optional,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                        {option.description}
                                                    </label>
                                                )
                                        )}
                                    </div>

                                    {state.isOptional[variant.id] && !state.cardCollapse[variant.id] && (
                                        <Input
                                            type="text"
                                            name={`optional value ${variant.id}`}
                                            value={optionInputValue[variant.id] || ""}
                                            onChange={(e) => handleInput(variant.id, e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    flushDebounce(variant.id);
                                                }
                                            }}
                                            ref={(el) => {
                                                if (state.isOptional[variant.id]) {
                                                    inputRef.current[variant.id] = el;
                                                }
                                            }}
                                            className="relative text-slate-800 border border-black rounded-lg w-1/2 bg-slate-100 mt-2"
                                            aria-label={`Custom Input for Variant: ${variant.render_name}`}
                                        />
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </FormWrapper>
    );
};

export default ProductSelect;
