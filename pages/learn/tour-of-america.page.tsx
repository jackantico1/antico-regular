import React, { useState, useEffect } from 'react'
import { LearningPathComponent } from '../../components/ContentObjects/LearningPath'
import NavBar from '../../components/Navigation/NavBar';
import Footer from '../../components/Footer/Footer';

function Page() {

    return (
        <>
            <NavBar/>
            <LearningPathComponent slug="tour-of-america" />
            <Footer/>
        </>
    );
}

export { Page };