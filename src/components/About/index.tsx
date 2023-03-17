import { Image, Center, Container, createStyles, Text, Title, Card, rem, List } from '@mantine/core';
import React from 'react';
import MarcoImg from '@/assets/marco.jpg';


const useStyles = createStyles(() => ({
  container: {
    border: "0.0625rem solid #ced4da",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "2rem",
    color: "#616161",

    "ul": {
      color: "#616161",
      marginLeft: "1rem",

      "li": {
        margin: "1rem auto",
        maxWidth: "800px",
      }
    },

    "a": {
      textDecoration: "inherit",
      color: "#79b458",
      cursor: "pointer",
    }
  },

  card: {
    position: 'relative',
    width: "250px",

  },

  title: {
    display: 'block',
    marginBottom: rem(5),
  },
  text: {
    maxWidth: "900px",
    margin: "1rem auto"
  },

  topic: {
    marginTop: "2rem",
    color: "black"
  }
}));

const About: React.FC = () => {
  const { classes, cx } = useStyles();

  const diff = (new Date().getTime() - new Date(645249553000).getTime());
  const yearsOld = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))

  return <Container className={classes.container}>
    <Title size={43} color="black">$Whoami</Title>
    <Text className={classes.text}>
      First of all, let me introduce myself. My name is:
    </Text>
    <Center>
      <Text p={10} align='center' >
        Marco Aurélio Barbosa Fagnani Gomes Lotz
      </Text>
    </Center>
    <Center>
      <Card withBorder radius="md" p={2} className={cx(classes.card)}>
        <Card.Section>
          <Image src={MarcoImg.src} width={265} />
        </Card.Section>
      </Card>
    </Center>
    <Text className={classes.text}>
      Yes, yes… you have no idea of how many free pints I got with bets of the other person correctly
      saying my name after only one repetition. I guess that the whole name (just guessing) would be too
      long for a website. Thus opted for <strong>Marco Lotz</strong>.
    </Text>
    <Text className={classes.text}>
      I am a {yearsOld} year-old Electronics and Telecommunications Engineer and I’ve been working as a Vice
      President for Swiss Re. I lead a globally distributed team composed of a mosaic of backgrounds
      (from PhDs in Mathematics to Apache open source contributors) driving Stargate Platform.
    </Text>
    <Text className={classes.text}>
      Stargate is a high-profile data platform based on Apache Spark, Avro, Parquet and related Big
      Data technologies. It is a deeply customized deployment of Palantir Foundry and under constant
      improvements. Our data platform consists of more than 7 Petabytes of real-world data being processed
      round the clock – from floods and earthquakes models to COVID-19 analytics. Some of our datasets
      have hundreds of billions of rows, posing concrete scalability challenges. Our team architects,
      develops and maintains Swiss Re data engineering backbone of Stargate. And we are hiring!
    </Text>
    <Text className={classes.text}>
      In my previous lifes, I also worked as:
    </Text>

    <List>
      <List.Item>
        Credit Suisse, as a contractor Lead Software Engineer – implementing and architecting from
        scratch all the way to production event driven systems to handle hundreds of millions of
        daily events.
      </List.Item>
      <List.Item>
        R3PI (Solera), as a senior software engineer on middleware team and being in charge of the Data Engineering team;
      </List.Item>
      <List.Item>
        the Swiss Post Innovation team – developing a platform to securely store Swiss health data in a reliable manner;
      </List.Item>
      <List.Item>
        Hewlett Packard Labs (HP Labs) with many of the best people in their fields, on bleeding-edge projects.
      </List.Item>

    </List>
    <Text className={classes.text}>
      As research hobbies, I am fascinated by graph systems (OLAP/OLTP), graph theory and event driven system – specially ones applied to temporal graph mutations :) On my personal free time and whenever I have some spare time, I also contribute to Apache Kafka – specially on Kafka Streams code base.
    </Text>

    <Title className={classes.topic}>
      Why This Website?
    </Title>
    <Text className={classes.text}>
      Basically I was looking for a place to output my thoughts and discussions. Then I realised, why not a website for this?
    </Text>
    <Text className={classes.text}>
      This website is mostly a place that I want to keep in order to store my thoughts and create discussion about themes here approached.
    </Text>
    <Text className={classes.text}>Do you agree with my ideas? Drop me a line and let me know.</Text>
    <Text className={classes.text}>Do you not agree at all with my ideas? Also drop me a line and let me know.</Text>
    <Text className={classes.text}>Do you have a suggestion? Drop me a line and let me know.</Text>

    <Title className={classes.topic}>
      Common Topics?
    </Title>
    <Text className={classes.text}>
      Distributed Systems, Graph Theory, Graph Systems, Embedded Systems, MapReduce, Hadoop, Pregel, YARN, Giraph, Spark, Kafka.
    </Text>

    <Title className={classes.topic}>
      Current Activity?
    </Title>
    <Title color="black">
      Past Activities?
    </Title>

    <List>
      <List.Item>Contractor Lead Software Engineer at <strong>Credit Suisse </strong>– leading a team composed of 9 brilliant senior software engineers designing and implementing multiple high-throughput event-driven systems – yes, yes, Kafka and all possible streaming related technologies everywhere – It’s great fun! We process hundreds of millions financial events a day, and soon even more!</List.Item>
      <List.Item>Senior Software Engineer at <strong>R3PI / Solera: </strong>Being in charge of the data engineering team – processing tenths of millions of images per day, in order to train machine learning models; and rendering hundreds of thousands of images from 3D models. While in the Middleware team, I designed and developed micro services, specially for non-blocking event driven systems.</List.Item>
      <List.Item>DevOps System (and later Software) Engineer at <strong>eHealth/Swiss Post</strong>, Zurich: Developing the e-Health platform, from CI/CD pipelines to implementing a large-scale transactional memory-constant property-graph based authorization system. All to keep health data as private as its owners want.</List.Item>
      <List.Item><strong>GraHPEr/Cytosm:</strong> Graph analytics without ETL. Empowering legacy relational databases to run graph queries.<br />
        <a href="https://es.slideshare.net/secret/ccftFBuzzGtFX4">Slides</a> | <a href="https://github.com/cytosm">Source code </a> | <a href="https://github.com/Alnaimi-/database-benchmark">Benchmarks</a> | <a href="https://event.cwi.nl/grades/2017/04-Steer.pdf">White paper</a></List.Item>
      <List.Item><strong>LOOM:</strong> a large-scale management tool to control millions of devices from a mobile phone/ tablet screen.<br />
        <a href="http://h30507.www3.hp.com/t5/Innovation-HP-Labs/Introducing-Loom-A-new-tool-for-managing-complex-systems/ba-p/167748#.VFYfFPmsUzE">Highlights</a> | <a href="https://www.youtube.com/watch?v=vutp0VP4EQY">Presentation video</a> | <a href="https://github.com/HewlettPackard/loom">Source code</a></List.Item>
      <List.Item><strong>OpenStack Monanas:</strong> Performing machine learning analytics with Spark OpenStack deployments, for anomaly detection and causality inferenceCode.<br />
        <a href="https://github.com/openstack/monasca-analytics">Source code</a></List.Item>
      <List.Item><strong>The Machine:</strong> Working on the management aspects of HPE’s “The Machine”, the first data center-scale memory-driven architecture.<br />
        <a href="https://www.hpe.com/content/dam/hpe/newsroom/featured-articles/pdf/Visual-Fact-Sheet-Final.pdf">Highlight</a> | <a href="http://www.wsj.com/articles/hp-enterprise-unveils-prototype-of-next-generation-computer-the-machine-1480361777">On News</a></List.Item>
      <List.Item><strong>ContainerOS:</strong> Designing the management aspects of an Operating System developed to enable security and isolation for containerized applications.</List.Item>
      <List.Item>Was a Researcher for Massive Dynamic Graphs Processing in Queen Mary – University of London. Most of the results from the research are available on my github page. In the dynamicGraph section there is also a copy of my report/dissertation about the subject and the code. One can find the report here: <em><a title="Massive Dynamic Graphs Report" href="https://marcolotz.comwp-content/uploads/2014/05/LotzReport.pdf">Report Link</a></em></List.Item>
      <List.Item>My graduation project – HadoopLung – won the first stage prize of the Big Data Challenge 2014 promoted by EMC² and UFRJ.</List.Item>
      <List.Item>Worked as an intern in Siemens Telecommunications in R&amp;D for next generation boards. Mainly worked with AVR, Embedded Linux Developing, RS-232 and USB protocols.</List.Item>
      <List.Item>Worked as an intern in ZF, in Friedrichshafen – Germany. There, I have developed component firmware for a set of transmissions, aside from some tools for Flashing the Transmission Control Units and converting its data into several formats. Last but not the least, worked with the Transmissions Diagnosis and detection methods trough firmware.</List.Item>
      <List.Item>Former UTFPR Big Data cluster administrator. Yep, that’s right. If you had a problem with your Hadoop or Giraph or Spark Application, I was the one you should come talk to.</List.Item>
      <List.Item>Author of the HadoopLung: an extensible MapReduce application that detects Lung Nodules on CTs Images with over 91% precision.</List.Item>
      <List.Item>Was tutor of the <em>Electromagnetism</em> and <em>Propagating waves and guides&nbsp;</em>modules. Wrote handbooks about the subjects that were used to teach the students that came after me. Must confess that I love Electromagnetism, but for now it is better to leave this working field for the physicists&nbsp;;)</List.Item>
    </List>

    <Text className={classes.text}>
      I have no intention of making here a complete CV, if you want more information about my resumé , please contact me in the contacts section :)
    </Text>

    <Title className={classes.topic}>
      Hobbies?
    </Title>
    <Text className={classes.text}>
      Aside from the two topics of the website, I really enjoy doing Latin Dancing and Ballroom. I am also an inveterate traveler too, must confess.
    </Text>

    <Title className={classes.topic}>
      Bands?
    </Title>
    <Text className={classes.text}>
      Daft Punk, Justice and Swedish House Mafia for sure!
    </Text>

    <Title className={classes.topic}>
      Favorite Book?
    </Title>
    <Text className={classes.text}>
      Asimov’s Foundation Series.
    </Text>

    <Title className={classes.topic}>
      Favorite Color?
    </Title>
    <Text className={classes.text}>
      Ok, ok! Too much about myself already. If you have any question, please let me know. Visit the contact page for more information.
    </Text>
  </Container>;
}

export default About;
