
import * as React from "react";
import axios from 'axios';
import { getProductList } from "../../api/product";

interface State {
  file: string;
  imagePreviewUrl: string;
  data: any[];
  loading: boolean;
}

export class HomePage extends React.Component<{}, State> {
      state: State = { file: "", imagePreviewUrl: "", data: [], loading: true };
      
      public async componentDidMount() {
      
        const data = await getProductList();
       
        this.setState({ data, loading: false });
      }
      public handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {         
          e.preventDefault();
          const reader = new FileReader();
          const file = (e.target as any).files[0] as Blob;
          reader.onloadend = () => {
            this.setState({
              file: file as any,
              imagePreviewUrl: (reader.result as string) || ""
            },()=>{
              console.log('data ', this.state);
            });
          };
          reader.readAsDataURL(file);
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
          axios.post("http://127.0.0.1:5000/classify",formData,config)
              .then((response) => {
                  alert("The file is successfully uploaded");
              // tslint:disable-next-line:no-empty
              }).catch((error) => {
          });
      }
        
        public render() {
          const { imagePreviewUrl } = this.state;
          let $imagePreview = null;
          if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} />;
            // const classNone = "text-none";
          } else {
            // $imagePreview = (
            //   <div className="previewText">Please select an Image for Preview</div>
            // );
          }
          // let className = '';
          // if (this.props.isActive) {
          //   className += ' text-none';
          // }
          return (
          <form onSubmit={this.onFormSubmit}>
          <div>
             
              {/* <ul>
                {this.state.data.map(x => (
                  <li key={x.id}>
                    {x.id} - 'ID'
                  </li>
                ))}
              </ul> */}
            
              <div className="row">
                <div className="col-lg-12">
                  <h1 className="page-header text-left">
                    Recognize your consonant as image{" "}
                  </h1>
                </div>
                </div>
               
                <div className="row">
                  <div className="col-lg-3 col-md-3">
                  <label htmlFor="image-input" className="panel panel-primary add-image">
                    {$imagePreview}
                    <div className="text">
                    <i className="fa fa-plus fa-2x img-add-logo cursor" aria-hidden="true" />
                    <br /> <span>Add high-res banner</span>
                    <br />
                    <span>48x48</span>
                    <br />
                    <br />
                    <span>Drop Image Here.</span>
                    </div>
                  </label>
                  <button type="submit" className="btn btn-info">Submit</button>
                </div>
               
               
                 {/* <div className="col-lg-3 col-md-3">
            <label htmlFor="image-input" className="panel">
              <div className="imgPreview ">{$imagePreview}</div>
            </label>
          </div> */}
                <input type="file" className="v-hidden" id="image-input" onChange={this.handleImageChange} name="photo"/>
                <div className="col-lg-4 col-md-4">
                  <div className="panel panel-default">
                    <div className="panel-heading text-left">
                      <i className="fa fa-spinner" />
                      &nbsp;
                      <span>Recognition Your image</span>
                    </div>
                    <div className="panel-body">
                      <div className="list-group text-left">
                        <a href="#" className="list-group-item">
                          <span>A</span>
                          <span className="pull-right text-muted small">
                            <em>50%</em>
                          </span>
                        </a>
                        <a href="#" className="list-group-item">
                          <span>B</span>
                          <span className="pull-right text-muted small">
                            <em>50%</em>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>;
            </form>
          )
           
        }
      }
