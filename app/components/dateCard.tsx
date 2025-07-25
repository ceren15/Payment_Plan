// components/DateCard.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateCardProps = {
    value: Date | null;
    onChange: (date: Date) => void;// 	Tarih değiştiğinde çağrılacak fonksiyon. Seçilen tarihi dışarıya bildirir.
    minDate?: Date; // 	Kullanıcının seçebileceği en erken tarih (örn: bugünden sonrası).
};

export function DateCard({ value, onChange, minDate }: DateCardProps) {
    return (
        <DatePicker
            selected={value}
            onChange={(date) => { // Kullanıcı bir tarih seçtiğinde date değeri gelir. Eğer tarih null değilse dışarıdan gönderilen onChange() fonksiyonu çağrılır.
                if (date) onChange(date); // Seçilebilecek en erken tarihi sınırlar. Genellikle geçmiş tarihler devre dışı bırakılır.
            }}
            dateFormat="dd/MM/yyyy"
            minDate={minDate}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-white"
        />
    );
}
