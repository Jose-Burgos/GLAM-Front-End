import { Divider, Grid } from "@mui/material";
import './landing.css'

export const Landing = () => {
    return (
        <div className="content">
            <h1>Grupo Latinoamericano de ayuda a mascotas</h1>
            <Grid container>
                <Grid item xs>
                    <h2>Left</h2>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs>
                    <h2>Right</h2>
                </Grid>
            </Grid>
        </div>
    );
}