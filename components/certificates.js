import Image from "next/image";
export default function Certificates(props) {
    const date = new Date(props.issued_on);
    const date_string = date.toDateString().split(' ').slice(1).join(' ');
    return (
        <div className="" data-aos="zoom-in-up">

            <div class="max-w-sm border  rounded-lg shadow bg-gray-800 border-gray-700">

                    {props.image_name ? (
                    <Image
                        src={"/certifications/" + props.image_name}
                        alt="random"
                        width={500}
                        height={500}
                        className="object-cover w-full h-64 rounded-t-lg"
                    />
                    ) : (
                        <Image
                        src={props.image_url}
                        alt="random"
                        width={500}
                        height={500}
                        className="object-cover w-full h-64 rounded-t-lg"
                    />)
                    }

                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">{props.name}</h5>
                    </a>
                    <p class="mb-1 font-normal text-gray-400">Credential Id: {props.credetial_id}</p>
                    <p class="mb-1 font-normal text-gray-400">Issued on: {date_string}</p>
                    <p class="mb-1 font-normal text-gray-400">Issuing By: {props.issuing_authority}</p>
                    
                    <a href={props.credential_url} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Certificate
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>
            </div>

        </div>
    );
}