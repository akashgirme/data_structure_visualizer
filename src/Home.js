import { Link } from "react-router-dom";
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
    <Grid container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       <Box  m='2rem' display='flex' flexDirection='column'
        alignItems='center' justifyContent='center'>
  
      <marquee scrollamount="12" infinite>
        <Typography variant='h6' sx={{letterSpacing:'2px'}}>
          ELEVATE DATA STRUCTURES WITH DYNAMIC VISUALS  &lt;/&gt;  ELEVATE DATA STRUCTURES WITH DYNAMIC VISUALS
                ELEVATE DATA STRUCTURES WITH DYNAMIC VISUALS  &lt;/&gt;  ELEVATE DATA STRUCTURES WITH DYNAMIC VISUALS

    </Typography>
    
    </marquee>

</Box>
      <Grid item sm={11} md={10} lg={10} xl={10} display='flex' flexDirection='column' justifyContent='center'>
        <Box m="1rem">
          <Box>
            <Typography variant="h5">Sorting Techniques</Typography>
          </Box>
          <Grid container spacing={2} mt="0.1rem" display='flex' alignItems='center' justifyContent='center'>
            <Grid item lg={3}>
              <Link to="/bubbleSort" style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ fontWeight: "500" }} variant="h3"
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                     textAlign='center'
                     mb='0.5rem'
                     >
                      Bubble Sort
                    </Typography>
                    <Typography 
                    
                    variant="h6"
                     display="flex"
                     justifyContent="center"
                     alignItems="center">Bubble Sort</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/quickSort" style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent>
                    <Typography variant="h3" 
                     display="flex"
                     justifyContent="center"
                     alignItems="center" 
                     textAlign='center'
                     mb='0.5rem' sx={{ fontWeight: "500" }}>
                      Quick Sort
                    </Typography>
                    <Typography variant="h6"
                     display="flex"
                     justifyContent="center"
                     alignItems="center">Quick Sort</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/selectionSort" style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="7rem">
                  <CardContent
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ fontWeight: "500" }} 
                     variant="h3"
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                     textAlign='center'
                     mb='0.5rem'>
                      Selection Sort
                    </Typography>
                    <Typography variant="h6"  display="flex"
                      justifyContent="center"
                      alignItems="center">Selection Sort</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/mergeSort" style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ fontWeight: "500" }} variant="h3"  display="flex"
                      justifyContent="center"
                      alignItems="center"
                      textAlign='center'
                     mb='0.5rem'>
                      Merge Sort
                    </Typography>
                    <Typography variant="h6"  display="flex"
                      justifyContent="center"
                      alignItems="center">Merge Sort</Typography>
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
          <Grid container spacing={2} mt="0.3rem" display='flex' alignItems='center' justifyContent='center'>
            <Grid item lg={3}>
              <Link to="/array" display='flex' alignItems='center' justifyContent='center' style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="5rem" display='flex' alignItems='center' justifyContent='center'>
                  <CardContent
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box mb='0.5rem' display="flex"
                      justifyContent="center"
                      alignItems="center">
                    <CardMedia
                      sx={{ height: "100px", width: "100px" }}
                      component="img"
                      height="100px"
                      Width="100px"
                      image={array}
                      alt="Array"
                     
                    />
                    </Box>
                    <Typography variant="h6"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      Array
                      </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/linkedList" style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent>
                  <Box mb='0.5rem' display="flex"
                      justifyContent="center"
                      alignItems="center">
                    <CardMedia
                      sx={{ height: "100px", width: "100px" }}
                      component="img"
                      height="100"
                      Width="100"
                      image={list}
                      alt="Linked-List"
                    />
                    </Box>
                    <Typography 
                    variant="h6"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    >
                      LinkList
                      </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/stack" style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent>
                  <Box mb='0.5rem' display="flex"
                      justifyContent="center"
                      alignItems="center">
                    <CardMedia
                      sx={{ height: "100px", width: "100px" }}
                      component="img"
                      height="100"
                      Width="100"
                      image={stack}
                      alt="Stack"
                    />
                    </Box>
                    <Typography variant="h6"
                     display="flex"
                     justifyContent="center"
                     alignItems="center">Stack</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/queue" style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent>
                  <Box mb='0.5rem' display="flex"
                      justifyContent="center"
                      alignItems="center">
                    <CardMedia
                      sx={{ height: "100px", width: "100px" }}
                      component="img"
                      height="100"
                      Width="100"
                      image={queue}
                      alt="Queue"
                    />
                    </Box>
                    <Typography variant="h6"
                     display="flex"
                     justifyContent="center"
                     alignItems="center">Queue</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Box mt='1.5rem' mb='5rem'>
          <Box>
            <Typography variant="h5">Searching Techniques</Typography>
          </Box>
          <Grid container spacing={2} mt="0.1rem" display='flex' alignItems='center' justifyContent='center'>
            <Grid item lg={3}>
              <Link to="/linearSearch" style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h3"
                     display="flex"
                     justifyContent="center"
                     alignItems="center" textAlign='center'
                     mb='0.5rem' sx={{ fontWeight: "500" }}>
                      Linear Search
                    </Typography>
                    <Typography variant="h6"
                     display="flex"
                     justifyContent="center"
                     alignItems="center">Linear Search</Typography>
                    
                  </CardContent>
                
                </Card>
              </Link>
            </Grid>
            <Grid item lg={3}>
              <Link to="/BinarySearch" style={{textDecoration:'none'}}>
                <Card variant="outlined" maxWidth="5rem">
                  <CardContent>
                    <Typography variant="h3" display="flex"
                     justifyContent="center"
                     alignItems="center" textAlign='center'
                     mb='0.5rem' sx={{ fontWeight: "500" }}>
                      Binary Search
                    </Typography>
                    <Typography variant="h6"
                     display="flex"
                     justifyContent="center"
                     alignItems="center">Binary Search</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Home;
