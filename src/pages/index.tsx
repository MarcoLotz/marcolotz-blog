import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Container } from '@mantine/core'
import Post from '@/components/Post'
import { JSONContent } from '@tiptap/core'

const content = `<h2>Context</h2>
<p>Hey mates! Did you have dependencies problems on packing a jar file and submitting it to the Hadoop/Giraph Cluster? Well, you can see in the mail lists many people suggesting to use Apache Ant or Apache Maven, but without giving any concrete example of how do actually do it. In the next sections I will give you a quick example of how to actually do it.</p>
<h2>Maven startup configuration</h2>
<p>Well, let’s assume that you have Maven properly installed already – if not, check <a href="https://maven.apache.org/download.cgi"><i>here</i></a>.</p>
<p>To check if maven was properly installed, run:</p>
<pre>mvn --version</pre>
<p>You should see an output similar to (may differ slightly):</p>
<pre>Apache Maven 3.0.5 (r01de14724cdef164cd33c7c8c2fe155faf9602da; 2013-02-19 14:51:28+0100)
Maven home: D:\apache-maven-3.0.5\bin\..
Java version: 1.6.0_25, vendor: Sun Microsystems Inc.
Java home: C:\Program Files\Java\jdk1.6.0_25\jre
Default locale: nl_NL, platform encoding: Cp1252
OS name: "windows 7", version: "6.1", arch: "amd64", family: "windows"</pre>
<h2>Creating the Maven Project</h2>
<p>Ok, now create the directory where you would like your project to reside. Once you have done that, run the following command into the empty project directory.</p>
<pre>mvn archetype:generate -DgroupId=com.marcolotz.giraph -DartifactId=TripletExample -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false</pre>
<p>Please choose a <strong>DgroupId</strong> and <strong>DartifactId</strong> that matches your project. The names in those fields above were just examples that I used in my personal project. Basically it belonged to package com.marcolotz.giraph and the project name was TripletExample</p>
<h2>Modifying the POM file</h2>
<p>Pom stands for <strong>Project Object Model</strong> and is the core of a project configuration in maven. You may have already realized that Giraph contains several pom files. When you created a maven project on the command that I mentioned above, a pom.xml file was also created. We now need to modify this file in order to build giraph code. Thus, modify the pom.xml content to the following:</p>
<pre>&lt;project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd"&gt;

&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
&lt;groupId&gt;com.marcolotz.giraph&lt;/groupId&gt;
&lt;artifactId&gt;tripletExample&lt;/artifactId&gt;
&lt;packaging&gt;jar&lt;/packaging&gt;
&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
&lt;name&gt;tripletExample&lt;/name&gt;
&lt;url&gt;http://maven.apache.org&lt;/url&gt;
&lt;dependencies&gt;
&lt;dependency&gt;
&lt;groupId&gt;junit&lt;/groupId&gt;
&lt;artifactId&gt;junit&lt;/artifactId&gt;
&lt;version&gt;3.8.1&lt;/version&gt;
&lt;scope&gt;test&lt;/scope&gt;
&lt;/dependency&gt;

&lt;dependency&gt;
&lt;groupId&gt;org.apache.giraph&lt;/groupId&gt;
&lt;artifactId&gt;giraph-core&lt;/artifactId&gt;
&lt;version&gt;1.1.0&lt;/version&gt;
&lt;/dependency&gt;

&lt;dependency&gt;
&lt;groupId&gt;org.apache.hadoop&lt;/groupId&gt;
&lt;artifactId&gt;hadoop-core&lt;/artifactId&gt;
&lt;version&gt;0.20.203.0&lt;/version&gt;
&lt;/dependency&gt;

&lt;/dependencies&gt;
&lt;build&gt;
&lt;plugins&gt;
&lt;plugin&gt;
&lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
&lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
&lt;version&gt;3.1&lt;/version&gt;
&lt;configuration&gt;
&lt;source&gt;1.7&lt;/source&gt;
&lt;target&gt;1.7&lt;/target&gt;
&lt;/configuration&gt;
&lt;/plugin&gt;
&lt;plugin&gt;
&lt;artifactId&gt;maven-assembly-plugin&lt;/artifactId&gt;
&lt;configuration&gt;
&lt;archive&gt;
&lt;/archive&gt;
&lt;descriptorRefs&gt;
&lt;descriptorRef&gt;jar-with-dependencies&lt;/descriptorRef&gt;
&lt;/descriptorRefs&gt;
&lt;/configuration&gt;
&lt;/plugin&gt;

&lt;/plugins&gt;
&lt;/build&gt;
&lt;/project&gt;

</pre>
<p>Should you actually use it to build a Hadoop project, just make sure that you are using the correct Hadoop version in the pom file to build and remove the Giraph dependency. Also please note that the “@Algorithm” notation used in some Giraph examples is not defined in the Giraph-Core, but actually in the Giraph-Examples. This will cause some build problems should your source code contain it.</p>
<h2>Inserting Custom Code and Building</h2>
<p>Now you just need to insert you java files in the package folder (for the example above in <i>tripletExample/src/main/java/com/marcolotz/giraph</i>) and build the solution. In order to build it, run the following command line in the folder where the pom.xml file is located:</p>
<pre>mvn clean compile assembly:single</pre>
<p>This command will clean the target folder (if not already empty) and prepare a single jar file with all the project dependencies inside. The final product of the command will be in the <strong>target</strong> folder. Since it contain all dependencies, the size of this jar file may be quite large. Finally you can submit the jar file to your hadoop cluster ;)</p>
<p>Please note that there are other solutions to reduce the size of the jar file, which are giving a class path argument to hadoop/giraph instead of packing everything in inside of jar. This is also an elegant solution for when the jar file would be too large to be easily distributed in a cluster.</p>

			</div>`

export default function Home() {
  return (
    <>
      <Head>
        <title>Marco Aurélio Lotz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Post
          author='Pedro o Brabo'
          body={content}
          category='Big Data'
          createdAt={new Date()}
          title="Build A Custom Hadoop/Giraph Project With Maven" />
      </Container>
    </>
  )
}
