import React from 'react';

const Modals = () => (
  <div>
    {/* <!-- Mueller Modal --> */}
    <div className="modal fade" id="muellerReports" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Mueller Report Highlights</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                Example content of what would show up when a big story is developing. This component still needs to be styled and worked on. Putting this here for presentation/functionality purposes though.
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-black" data-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
            </div>
        </div>
    </div>

    {/* <!-- Sale Modal --> */}
    <div className="modal fade" id="sale" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">20% Sale</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                This one speaks for itself, maybe add an image and more text but basiclly a site wide message of letting people know a sale is going on and with what.
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-black" data-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
            </div>
        </div>
    </div>

    {/* <!-- Pin Modal --> */}
    <div className="modal fade" id="pin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Pinned Story</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                This is a pinned story, once the site is complete this will redirect to the story in reference. If we know a story is developing or will evolve we will let users subscribe to it and be notified so they can stay up to date with the news they care about all within our site. 
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-black" data-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
            </div>
        </div>
    </div>
  </div>
);

export default Modals;
