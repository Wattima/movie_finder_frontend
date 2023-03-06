import ContentCard from "./ContentCard";
import styled from 'styled-components'

function Display({creations, setViewItem, user, path, setCreationDelete}) {
    const display = creations.map(creation => <ContentCard user ={user} setCreationDelete={setCreationDelete} path={path} creation={creation} setViewItem={setViewItem} key={creation.id}/>)
    return(
        <BrowseWriting>
            {display}
        </BrowseWriting>
    )
}

export default Display;

const BrowseWriting = styled.div`
 margin: 0px 10px 10px 230px;
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-wrap: wrap;
  /* width: 800px; */
  background-color: hsl(50, 50%, 70%);
  border-radius: 5px;
  border: solid;
  border-width: 1px;
  min-height:64vh;

  div:hover {
    background-color: hsl(60, 50%, 90%);
  border-color: hsl(180, 50%, 20%);
  }
`
