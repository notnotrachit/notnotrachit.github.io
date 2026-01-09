"use client";

import AOS from "aos";
import { useEffect } from "react";

export default function AOSc() {
    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);
    return (
        <></>
    );
    }