import * as React from 'react';
import { TitleLable } from 'src/components/TitleLabel';

import { getProductList } from '../../api/product';

interface IStates {
  data: any[];
  loading: boolean;
}
export class ProductPage extends React.Component<{}, IStates> {
  public state: IStates = { data: [], loading: true };

  public async componentDidMount() {
    await this.sleep(5000);
    const data = await getProductList();
    // tslint:disable-next-line:no-console
    console.log('loading component success');
    this.setState({ data, loading: false });
  }
  public sleep(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }
  public render() {
    // tslint:disable-next-line:no-console
    console.log('render');
    if (this.state.loading) {
      return <div>Loading ...</div>;
    }
    return (
      <div>
        <ul>
          {this.state.data.map(x => (
            <li key={x.id}>
              {x.id} - <TitleLable name={x.title} color={x.id % 2 ? 'red' : 'blue'} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
