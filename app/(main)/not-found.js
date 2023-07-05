
import Link from "next/link"
export default function e404(){
    return(
        <>
        <div className="flex justify-center bg-base-100">
            <div>
                <h1 className="text-4xl py-10 text-center">404 Not Found</h1>
                <p className="text-center">Seems like you lost your way, maybe try going back to the home page</p>
                <div className="flex justify-center py-5">
                    <a href="/"><button className="btn btn-primary">Go Home</button></a>
                </div>
            </div>
        </div>
        </>
    )
}