import { Card, Button, ButtonGroup, styled } from "@mui/material";

const CardContainer = styled(Card)({
    borderRadius: 15,
    padding: 20, 
    marginBlockStart: 10,
});

const ButtonG = styled(ButtonGroup)({
    padding: 10,
    fontFamily: 'Shadows Into Light',
    color: "red",
    alignItems: "center"
})

const Btn = styled(Button) ({
    fontFamily: 'Shadows Into Light',
    color: "red",
    paddingRight: 100
})

export const Landing = () => {
    return (
        <>
            <h1>Grupo Latinoamericano de ayuda a mascotas</h1>
            <CardContainer>
                <h2>Encuentra a tu nuevo mejor amigo!!</h2>
                <ButtonG>
                    <Btn variant="text">Gatos</Btn>
                    <Btn variant="text">Perros</Btn>
                </ButtonG>
            </CardContainer>

            <CardContainer>
                <h2>Ayudanos a cuidar mas compañeros</h2>
                <ButtonG>
                    <Btn variant="text">Reportar maltrato</Btn>
                    <Btn variant="text">Reportar animal suelto</Btn>
                </ButtonG>
            </CardContainer>

        </>
    );
}