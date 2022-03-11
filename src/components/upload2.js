import axios from 'axios';
import FormData from 'form-data';
import '../styles/section.css'
 
import React,{Component} from 'react';

class Upload extends Component {
  
    state = {
 
      // Initially, no file is selected
      selectedFile: null,
      reponse: null,
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
      
      let file = event.target.files[0]
      // Update the state
      this.setState({ selectedFile: event.target.files[0]});
    
    };

    // Click on the upload button
    onFileUpload = () => {
    
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object      
      formData.append('image',
        this.state.selectedFile,
      );
      
      axios.post("http://localhost:8000/upload_image", 
                  formData,
                  {headers: {
                    'content-type': 'multipart/form-data'
                  }}
                  )
      .then(res => 
        this.setState({reponse: res.data}),
        )
      
    };

    prediction = () => {
      if (this.state.reponse) {
        return (
          <section>
            <p>
            <br/>
            <br/>
              {this.state.reponse}
            </p>
          </section>
        )}
        else {
          return (
            <section>
            <p>
              <br/>
              <br/>
              Pas de prédiction pour le moment
            </p>
            </section>
          );
        }
    };
    
    fileData = () => {
    
        if (this.state.selectedFile) {
           
          return (
            <section >
            <div>
              <h2 className='text'>File Details:</h2>
               
  <p>File Name: {this.state.selectedFile.name}</p>
   
               
  <p>File Type: {this.state.selectedFile.type}</p>
   
               
  <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
              </p>
   
            </div>
          </section>
          );
        } else {
          return (
            <div >
              <br />
              <h4 className='text'>Choisissez l'image avant de l'uploader</h4>
            </div>
          );
        }
      };
      
      render() {
      
        return (
          <section>
          <div className='text'>
              <div className='text'>
                  <input type="file" onChange={this.onFileChange} />
                  <button onClick={this.onFileUpload}>
                    Uploader
                  </button>
              </div>
            {this.fileData()}
            </div>
            <div className='text'>
              {this.prediction()}
            </div>
          </section>
          
        );
      }

    }

export default Upload