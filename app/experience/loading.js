import Image from "next/image"
export default function Loading(){
    return(
        <div className="flex justify-center bg-base-100">
            <div>
                <h1 className="text-4xl py-10 text-center">Loading...</h1>
                <p className="text-center">Please wait while we load the page</p>
                <Image
                    src="/loading.svg"
                    alt="Loading"
                    width={150}
                    height={150}
                    className="mx-auto"
                />  
            </div>
        </div>
    )
}