import "./App.css";
import { Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/layout";

function App() {
  return (
    <div className="App">
      <Text fontSize="6xl" as="b">
        Pro.io
      </Text>
      <Text fontSize="2xl" color="blue.theme">
        Homepage
      </Text>
      <Link>Chakra UI</Link>
    </div>
  );
}

export default App;
