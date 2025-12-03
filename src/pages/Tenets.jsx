import React from 'react';
import PageLayout from '../components/PageLayout';

const Tenets = () => {
    return (
        <PageLayout title="The Tenets">
            <div className="prose prose-lg text-gray-700 mx-auto">
                <ul className="space-y-6">
                    <li>
                        <span className="font-bold text-blue-900">1.</span> The unity of the Godhead and the Trinity of the Persons therein.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">2.</span> The utter depravity of human nature, the necessity for repentance and regeneration, and the eternal doom of the finally impenitent.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">3.</span> The virgin birth, sinless life, atoning death, triumphant resurrection, ascension and abiding intercession of our Lord Jesus Christ: his second coming and millennial reign upon earth.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">4.</span> Justification and sanctification of the believer through the finished work of Christ.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">5.</span> The baptism of the Holy Ghost for believers, with signs following.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">6.</span> The nine gifts of the Holy Ghost for the edification, exhortation and comfort of the Church, which is the Body of Christ.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">7.</span> The sacraments of baptism by immersion, and of the Lord's Supper.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">8.</span> The divine inspiration and authority of the Holy Scriptures.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">9.</span> Church government by Apostles, Prophets, Evangelist, Pastors, Teachers, Elders and Deacons.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">10.</span> The possibility of falling from grace.
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">11.</span> The obligatory nature of tithes and offerings.
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
};

export default Tenets;
