"use client";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function Analytics(){
    return(
        <>
        <GoogleAnalytics trackPageViews gaMeasurementId="G-YG4LM0HFDQ"/>
        </>
    )
}