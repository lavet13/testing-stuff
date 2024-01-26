import { Component, ReactNode } from "react";
import { isEqual } from "lodash";

interface IClassComponentState {
  items: string[];
  searchField: string;
}

interface IClassComponentProps {}

class ClassComponent extends Component<
  IClassComponentProps,
  IClassComponentState
> {
  filteredItems: string[] = [];

  constructor(props: IClassComponentProps) {
    super(props);

    this.state = {
      items: ["Ivan", "Pavel", "Sasha", "Michael"],
      searchField: "",
    };
  }

  updateFilteredList = () => {
    const { items, searchField } = this.state;

    this.filteredItems = items.filter((item) =>
      item.toLowerCase().trim().includes(searchField.toLowerCase().trim()),
    );
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchField = e.target.value;

    this.setState({ searchField });
  };

  render(): ReactNode {
    this.updateFilteredList();

    const { searchField } = this.state;

    return (
      <>
        <input type="search" value={searchField} onChange={this.handleChange} />

        {this.filteredItems.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </>
    );
  }
}

export default ClassComponent;
