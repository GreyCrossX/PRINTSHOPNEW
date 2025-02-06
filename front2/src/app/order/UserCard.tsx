"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type Action } from "./UserInfoForm";
import { Edit, X } from "lucide-react";
import { useState } from "react";

interface UserCardProps {
    userData: {
        id: number | null;
        user_id: string;
        name: string;
        last_name: string;
        email: string;
        phone: string;
        address: string;
    };
    isEdited: boolean;
    handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    dispatch: React.Dispatch<Action>;
    handleSave: (e: React.MouseEvent) => void;
}

export default function UserCard({
    userData,
    isEdited,
    handleData,
    dispatch,
    handleSave,
}: UserCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(userData);

    const handleEditToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isEditing) {
            dispatch({ type: "RELOAD_DATA", payload: originalData });
            setIsEditing(false);
        } else {
            setOriginalData(userData);
            setIsEditing(true);
        }
    };

    return (
        <Card className="bg-slate-200 border-none shadow-md">
            <CardHeader className="bg-[#00579e] text-white p-4 rounded-t-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                        {userData.name} {userData.last_name}
                    </h3>
                    <div className="flex gap-2">
                        {isEdited && (
                            <Button
                                onClick={handleSave}
                                type="button"
                                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1"
                            >
                                Guardar
                            </Button>
                        )}
                        <Button
                            onClick={handleEditToggle}
                            type="button"
                            variant={isEditing ? "destructive" : "secondary"}
                            className="text-sm px-3 py-1"
                        >
                            {isEditing ? (
                                <>
                                    <X className="h-4 w-4 mr-1" />
                                    Cancelar
                                </>
                            ) : (
                                <>
                                    <Edit className="h-4 w-4 mr-1" />
                                    Editar
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleData}
                        disabled={!isEditing}
                        className={`bg-white border-slate-300 ${
                            isEditing ? "hover:border-blue-400" : "bg-slate-100"
                        }`}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Teléfono</label>
                    <Input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleData}
                        disabled={!isEditing}
                        className={`bg-white border-slate-300 ${
                            isEditing ? "hover:border-blue-400" : "bg-slate-100"
                        }`}
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Dirección</label>
                    <Input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleData}
                        disabled={!isEditing}
                        className={`bg-white border-slate-300 ${
                            isEditing ? "hover:border-blue-400" : "bg-slate-100"
                        }`}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
