import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import array from "./Assets/array.png";
import list from "./Assets/list.png";
import stack from "./Assets/stack.png";
import queue from "./Assets/queue.png";

const Home = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box mt="1rem" style={{ width: "80%" }}>
        <Box m="1rem">
          <Box>
            <Typography variant="h5">Sorting Techniques</Typography>
          </Box>
          <Grid container spacing={2} mt="0.1rem">
            <Grid item lg={3}>
              <Link to="/bubbleSort">
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ fontWeight: "700" }} variant="h3">
                      Bubble Sort
                    </Typography>
                    <Typography variant="h6">Bubble Sort</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/quickSort">
                <Card maxWidth="5rem">
                  <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "700" }}>
                      Quick Sort
                    </Typography>
                    <Typography variant="h6">Quick Sort</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Box>
            <Typography variant="h5">Basic Data Structures</Typography>
          </Box>
          <Grid container spacing={2} mt="0.3rem">
            <Grid item lg={3}>
              <Link to="/array">
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CardMedia
                      sx={{ height: "100px", width: "100px" }}
                      component="img"
                      height="100"
                      Width="100"
                      image={array}
                      alt="Array"
                    />
                    <Typography variant="h6">Array</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/linkedList">
                <Card maxWidth="5rem">
                  <CardContent>
                    <CardMedia
                      sx={{ height: "100px", width: "100px" }}
                      component="img"
                      height="100"
                      Width="100"
                      image={list}
                      alt="Linked-List"
                    />
                    <Typography variant="h6">LinkList</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/stack">
                <Card maxWidth="5rem">
                  <CardContent>
                    <CardMedia
                      sx={{ height: "100px", width: "100px" }}
                      component="img"
                      height="100"
                      Width="100"
                      image={stack}
                      alt="Stack"
                    />
                    <Typography variant="h6">Stack</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/queue">
                <Card maxWidth="5rem">
                  <CardContent>
                    <CardMedia
                      sx={{ height: "100px", width: "100px" }}
                      component="img"
                      height="100"
                      Width="100"
                      image={queue}
                      alt="Queue"
                    />
                    <Typography variant="h6">Queue</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Box mt="1rem">
          <Box>
            <Typography variant="h5">Searching Techniques</Typography>
          </Box>
          <Grid container spacing={2} mt="0.1rem">
            <Grid item lg={3}>
              <Link to="/linearSearch">
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h3" sx={{ fontWeight: "700" }}>
                      Linear Search
                    </Typography>
                    <Typography variant="h6">Linear Search</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/BinarySearch">
                <Card maxWidth="5rem">
                  <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "700" }}>
                      Binary Search
                    </Typography>
                    <Typography variant="h6">Binary Search</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Home;
