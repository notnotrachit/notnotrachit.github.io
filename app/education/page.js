import Education_Card from "@/components/education"
export default function Education() {
    return(
        <div className="justify-center py-2 mb-8 lg:mb-5 bg-base-100">
            <div className="w-full">
                <div className="flex justify-center w-screen" data-aos="zoom-in-up">
                    <h1 className="text-3xl font-bold">Education</h1>
                </div>
            </div>
        <div className="flex justify-center mt-5">
            <Education_Card/>
        </div>
        </div>
    )
}