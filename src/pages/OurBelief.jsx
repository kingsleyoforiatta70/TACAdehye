import React from 'react';
import PageLayout from '../components/PageLayout';

const OurBelief = () => {
    return (
        <PageLayout title="Our Belief">
            <div className="prose prose-lg text-gray-700 mx-auto">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Rules of Belief</h2>
                <ul className="space-y-6">
                    <li>
                        <span className="font-bold text-blue-900">1.</span> A personal testimony of your Salvation in Christ. (Acts 4:12; Rom 10:9)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">2.</span> Your acknowledgment of and obedience to the Order and Officers of the Church: Apostles, Prophets, Evangelists, Pastors, Teachers, Elders and Deacons. (Heb 13:17; Eph 4:11; 1 Cor. 12:28)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">3.</span> Your presence in the meetings of the Church and abidance in full communion; that is, not to absent yourself more than three times from communion without sufficient reason given for your absence. (Heb 10:25)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">4.</span> Your conformity with the fundamental doctrines of the Church, as well as with the two ordinances, namely baptism by immersion, and the Lord's Supper. (2 John 1:9; Rom 6:4, Luke 22:19, 1 Cor 11:24)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">5.</span> That you contribute towards the support of the cause, as taught unto us in the Word of God. (Gen 14:20, 28:22, Lev 27:30, 1 Chronicles 29:14, Heb 7:8)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">6.</span> That you keep the counsels of the Church within the Church. (Matthew 7:6)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">7.</span> That you pray for and help every member, remembering that we are joint members in the Body of Christ. (Heb 10:24; 1 Cor. 12:25; 1 Tim 2:1 Gal 6:2)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">8.</span> Endeavoring to keep the unity of the Spirit in the bond of peace. (Eph 4:3)
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
};

export default OurBelief;
