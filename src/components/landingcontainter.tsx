import { Card, Divider, Grid } from "@mui/material";
import './landingcontainer.css'

export default function LandingContainter(props: any) {
    return (
        <Card className="cont-card">
            <Grid container className="cont">
                <Grid item xs>
                    {props.left ?
                        <img className="cont-img" src={props.path} alt="happy pets" width={300} height={250} />
                        :
                        <>
                            <h2 className="cont-subt">{props.subt}</h2>
                            <p className="const-parag">{props.parag}</p>
                        </>
                    }
                </Grid>
                <Divider className="divider" orientation="vertical" flexItem />
                <Grid item xs>
                    {props.left ?
                        <>
                            <h2 className="cont-subt">{props.subt}</h2>
                            <p className="const-parag">{props.parag}</p>
                        </>
                        :
                        <img className="cont-img" src={props.path} alt="happy pets" width={300} height={250} />
                    }
                </Grid>
            </Grid>
        </Card>
    );
}