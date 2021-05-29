// import * as React from "react";
// import { useForm } from "react-hook-form";
// // import Headers from "./Header";

import React, { useEffect } from 'react';

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useForm, useWatch } from "react-hook-form";

export default function Playground() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            "Cover Fees": false
        }
    });
    const watchCoverFees = watch("Cover Fees", false);

    const onSubmit = (data) => alert(JSON.stringify(data));

    const router = useRouter()
    const { param } = router.query

    useEffect(() => {

    });

    return (

        <div className="playground-page">

            <Head>
                <title>Playground | Articles</title>
                {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js"></script> */}
            </Head>

            <div className="container">

                <div className="card mx-auto mb-3" style={{ "width": "24rem" }}>

                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-group articles">
                                <label htmlFor="firstName">First Name</label>
                                <input {...register("firstName", { required: true })} id="firstName" className="form-control with-label" />
                            </div>

                            {/* {errors.firstName && errors.firstName.type === "required" && <span>This is required</span>} */}
                            {/* {errors.firstName && errors.firstName.type === "maxLength" && <span>Max length exceeded</span> } */}

                            <div className="form-group articles">
                                <label htmlFor="lastName">Last Name</label>
                                <input {...register("lastName")} id="lastName" className="form-control with-label" />
                            </div>

                            <div className="form-group articles">
                                <label htmlFor="message">Message</label>
                                <textarea {...register("message")} id="message" className="form-control with-label" />
                            </div>

                            {/* <input {...register("coverFees", { required: true })} type="radio" value="No" /> */}
                            {/* <input {...register("coverFees", { required: true })} type="radio" value=" Yes" /> */}

                            <div className="form-group articles articles-switch-container">

                                <label className="" htmlFor="coverFees">Cover Processing Fees?</label>

                                <div className="articles-switch-wrap mb-3 py-1 px-3">

                                    <label className="articles-switch mb-0">
                                        {/* <input disabled type="checkbox" checked={data.coverFees}/> */}
                                        <input type="checkbox" id="coverFees" checked={watchCoverFees} placeholder="Cover Fees" {...register("Cover Fees", { required: true })} />
                                        <span className="slider"></span>
                                    </label>

                                    <div className="text-muted">$0.39 Fees</div>

                                </div>

                            </div>

                            {/* <select className="mb-3" {...register("category")}>
                                <option value="">Select...</option>
                                <option value="A">Category A</option>
                                <option value="B">Category B</option>
                            </select> */}

                            <input className="btn btn-articles-light w-100" type="submit" />

                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
}

// function OutsetPage() {
//     const router = useRouter()
//     const { param } = router.query

//     console.log(router.pathname)
//     console.log(param);

//     return(
//         <section className="outset-page">

//             <Head>
//                 <title>Outset - Articles</title>
//             </Head>

//             <div className="container py-3">
//                 <h2>Outset Page</h2>
//                 <p>Coming Soon.</p>
//             </div>

//         </section>
//     )
// }

// export default OutsetPage;