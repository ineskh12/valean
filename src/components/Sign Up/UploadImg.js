import React, { useState, useEffect } from 'react';

import { isAuth } from '../../helpers/auth'

const UploadImg = ({logo}) => {

    const [file, setFile] = useState();
    

    useEffect(async() => {

        console.log("taswira ", file);

        await file;

        console.log(file.name)
  
         logo = file.name


    }, [file,logo])


    const handlePicture = (e) => {

         

        e.preventDefault();


        const data = new FormData();      // object de javascript  pour mettre notre image et des information qui on va passer

  console.log(file)

        data.append("name", file.name);
        //data.append('userId', isAuth()._id);
        data.append('file', file);

        console.log(data)


    }

    return (
        <>


            <label for="file" class="label-file"><img src='https://edovel.com/wp-content/uploads/2019/06/Quentin.jpg' 
            style={{ width: '50px', height: '50px', marginTop: '-7%' }} /></label>

            <input id="file" class="input-file" type="file"
                onChange={(e) => setFile(e.target.files[0]),console.log(e.target.files)} />

            <input onClick={handlePicture} value='Envoyer' />



        </>
    );
};

export default UploadImg;