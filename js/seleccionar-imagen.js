const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');

selectImage.addEventListener('click', function(){
    inputFile.click();
})
inputFile.addEventListener('change',function(){
    const image = this.files[0]
    console.log(image)
    const reader = new FileReader();
}
)