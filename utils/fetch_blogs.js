export default async function all_blogs() {
    fetch("https://dev.to/api/articles?username=dilutewater")
        .then((res) => res.json())
        .then((data) => {
            return data
        })
}
