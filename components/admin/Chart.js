import React, { useEffect, useRef, useState } from 'react';
// import Chartjs from 'chart.js';
// import moment from 'moment'
import dynamic from 'next/dynamic'

const Chart = dynamic(
    () => import('chart.js'),
    { ssr: false }
)

const ChartDisplay = () => {

    return (
        <div>
        
        </div>
    );
};

export default ChartDisplay;