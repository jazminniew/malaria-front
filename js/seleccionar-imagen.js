const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');

selectImage.addEventListener('click', function(){
    inputFile.click();
})
inputFile.addEventListener('change',function(){
    const image = this.files[0]
    console.log(image)
    const reader = new FileReader();
    reader.onload = ()=>{
        const imgUrl = reader.result;
        const img = document.createElement('img');
        img.src = imgUrl;
        imgArea.appendChild(img);   
    }
    reader.readAsDataURL(image);
}
)