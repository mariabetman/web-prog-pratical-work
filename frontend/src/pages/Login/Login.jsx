import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Container, 
    Box, 
    Typography, 
    InputAdornment, 
    IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
    PersonPinOutlined, 
    LockOutlined, 
    VisibilityOutlined, 
    VisibilityOffOutlined 
} from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "../Login/Login.scss";
import Logo from '../../assets/images/logo.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomField from '../../components/CustomField/CustomField';

const StyledLink = styled(Link)(() => ({
    color: '#FED36A',
    textDecoration: 'none',
    '&:hover': {
        color: '#E5BC5E',
    },
}));

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values)
        resetForm()
    };

    return (
        <Container
            className='login'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
            }}
        >
            <img className='login__logo' src={Logo} alt='DayTask logo' />
            <Typography
                component="h2"
                gutterBottom
                sx={{
                    fontSize: '1.625rem',
                    fontWeight: '500',
                    color: '#fff',
                    alignSelf: 'flex-start',
                }}
            >
                Welcome Back!
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isValid, dirty }) => (
                    <Form
                        style={{
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                mt: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <CustomField
                                name="email"
                                label="E-mail"
                                type="email"
                                error={touched.email && Boolean(errors.email)}
                                helperText={<ErrorMessage name="email" />}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonPinOutlined sx={{ color: '#fff', marginRight: '.5rem' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                            />

                            <CustomField
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                error={touched.password && Boolean(errors.password)}
                                helperText={<ErrorMessage name="password" />}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlined sx={{ color: '#fff', marginRight: '.5rem' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOutlined sx={{ color: '#fff' }} />
                                                ) : (
                                                    <VisibilityOffOutlined sx={{ color: '#fff' }} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                            />

                            <CustomButton 
                                type="submit"
                                disabled={!(isValid && dirty)}
                                fullWidth
                                text='Log In'
                                variantStyle='filled'/>

                            <Typography
                                component="p"
                                sx={{
                                    width: 'fit-content',
                                    fontSize: '1rem',
                                    color: '#8CAAB9',
                                }}
                            >
                                Don't have an account?{' '}
                                <StyledLink to='/register'>
                                    Sign Up
                                </StyledLink>
                            </Typography>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Container>
  )
}