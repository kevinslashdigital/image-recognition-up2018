import * as React from "react";
import axios from 'axios';

interface State {
  file: string;
  imagePreviewUrl: string;
  data: any[];
  loading: boolean;
}

export class HomePage extends React.Component<{}, State> {
  state: State = { file: "", imagePreviewUrl: "", data: [], loading: true };
  
  public async componentDidMount() {
    this.setState({ loading: false });
  }

  public handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {         
    e.preventDefault();
    const reader = new FileReader();
    const file = (e.target as any).files[0] as Blob;
    reader.onloadend = () => {
      this.setState({
        file: file as any,
        imagePreviewUrl: (reader.result as string) || ""
      },() => { 
        console.log('data ', this.state);
      });
    };
    if(file){
      reader.readAsDataURL(file);
    }
  };
    
  onFormSubmit=(e:any)=>{
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);
    formData.append('photo',this.state.file);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    axios.post("http://127.0.0.1:4000/classify",formData,config)
      .then((response) => {
        console.log('This is Response: ', response.data.result);
        // console.log(Object.keys(response.data.result));

        // Object.keys(response.data.result).forEach((key) => {
        //   console.log(key + ': ' + response.data.result[key]);
        // });

        const arrayList = [];
        for(const key in response.data.result) {
          if (key && response.data.result[key]) {
            // console.log('This is key: ', key, 'Value: ', response.data.result[key]);
            arrayList.push({
              key,
              value: response.data.result[key],
            });
          }
        }
        this.setState({
          data: arrayList
        }, ()=> console.log('This is Data:', this.state.data));

        // console.log(arrayList);
        // console.log(arrayList[0].value * 100); 
        // alert("The file is successfully uploaded");
        // tslint:disable-next-line:no-empty

      }).catch((error) => {
        console.log(error);
    });
  }

  renderData(){
    const items = [];
    const that = this;
    // console.log("Data Amount: ", that.state.data.length);
    // console.log("This is Data: ", this.state.data);

    if(that.state.data.length > 0){
      for(let i = 0; i < 5; i++){
        // console.log(that.state.data[i].key);
        // const percentage = Math.round(((that.state.data[i].value * 100) * 100)/ 100);
        items.push(
          <a href="#" className="list-group-item">
            <span>{that.state.data[i].key}</span>
            <span className="pull-right text-muted small">
              {/* <em>{percentage} %</em> */}
              <em>{that.state.data[i].value}</em>
            </span>
          </a>
        )
      }
    }
    return items;
  }  

  public render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }
    return (
      
      <form onSubmit={this.onFormSubmit}>
        <div >
          <div className="col-lg-12">
            <h1 className="page-header text-left">
              Khmer Alphabets Image Recognition{" "}
            </h1>
          </div>
        <div className="col-lg-12 col-md-12">     
          <div className="col-lg-3 col-md-3">
            <label htmlFor="image-input" className="panel panel-primary add-image">
              {
                $imagePreview ? $imagePreview :
  
                <div className="text">
                  <i className="fa fa-plus fa-2x img-add-logo cursor" aria-hidden="true" />
                  <br />
                  <span>Drop Image Here</span>
                </div>
              }
            </label>
            <input type="file" className="v-hidden" id="image-input" onChange={this.handleImageChange} name="photo"/>
            <button type="submit" className="btn btn-info">Submit</button>
          </div>

          <div className="col-lg-4 col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading text-left">
                <i className="fa fa-spinner" />
                &nbsp;
                <span>Prediction Result</span>
              </div>
              <div className="panel-body">
                <div className="list-group text-left">
                  { this.renderData() }
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </form>


    )
  }
}
