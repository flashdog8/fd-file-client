<template>
  <div class="form">
    <div id="iframeEditor" ref="iframeEditor"></div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      config: {
        type: "desktop",
        mode: "edit",
        documentType: "text",
        document: {
          title: "6761154441585635328.docx",
          url:
            "http://192.168.1.200:9000/wang/6761154441585635328.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20210130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210130T053355Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3995ecbb03e896b8b20843a4e215752ea4858ac1421932cf8a4019b927a384d9",
          fileType: "docx",
          key: "-1048126161",
          permissions: {
            comment: true,
            download: true,
            edit: true,
            fillForms: true,
            modifyFilter: true,
            modifyContentControl: true,
            review: true,
          },
          info: {
            sharingSettings: [
              {
                permissions: "Full Access",
                user: "John Smith",
                link: false,
              },
              {
                permissions: "Read Only",
                user: "Mark Pottato",
                link: false,
              },
              {
                permissions: "Read Only",
                user: "Hamish Mitchell",
                link: false,
              },
              {
                permissions: "Read Only",
                user: "http://www.baidu.com",
                link: true,
              },
            ],
          },
        },
        editorConfig: {
          actionLink: null,
          mode: "edit",
          callbackUrl:
            "http://169.254.42.36:30001/only/index?type=track&fileName=6761154441585635328.docx&userAddress=192.168.40.1",
          lang: "zh",
          user: {
            id: "1",
            name: "王万佳",
          },
          customization: {
            goback: {
              url: "http://169.254.42.36:30001/only/index",
            },
            logo: {
              image: null,
              url: null,
            },
          },
          embedded: null,
        },
        token: null,
      },
    };
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      var docEditor;

      var innerAlert = function (message) {
        if (console && console.log) console.log(message);
      };

      var onAppReady = function () {
        innerAlert("Document editor ready");
      };

      var onDocumentStateChange = function (event) {
        var title = document.title.replace(/\*$/g, "");
        document.title = title + (event.data ? "*" : "");
      };

      var onRequestEditRights = function () {
        location.href = location.href.replace(RegExp("mode=view&?", "i"), "");
      };

      var onError = function (event) {
        if (event) innerAlert(event.data);
      };

      var onOutdatedVersion = function (event) {
        location.reload(true);
      };

      var replaceActionLink = function (href, linkParam) {
        var link;
        var actionIndex = href.indexOf("&actionLink=");
        alert(actionIndex);
        if (actionIndex != -1) {
          var endIndex = href.indexOf("&", actionIndex + "&actionLink=".length);
          if (endIndex != -1) {
            link =
              href.substring(0, actionIndex) +
              href.substring(endIndex) +
              "&actionLink=" +
              encodeURIComponent(linkParam);
          } else {
            link =
              href.substring(0, actionIndex) +
              "&actionLink=" +
              encodeURIComponent(linkParam);
          }
        } else {
          alert(linkParam);
          link = href + "&actionLink=" + encodeURIComponent(linkParam);
        }
        alert(href);
        alert(link);
        return link;
      };

      var onMakeActionLink = function (event) {
        alert();
        var actionData = event.data;
        alert(actionData);
        var linkParam = JSON.stringify(actionData);
        alert(linkParam);
        docEditor.setActionLink(replaceActionLink(location.href, linkParam));
      };
      var onRequestSendNotify = function (event) {
        var ACTION_DATA = event.data.actionLink;
        var comment = event.data.message;
        var emails = event.data.emails;
      };

      var onCollaborativeChanges = function () {
        alert("bierengaine");
      };

      var onDocumentReady = function () {};

      var onRequestUsers = function () {
        docEditor.setUsers({
          users: [
            {
              email: "john@example.com",
              name: "John Smith",
            },
            {
              email: "kate@example.com",
              name: "Kate Cage",
            },
          ],
        });
      };

      var config = this.config;
      config.width = "95%";
      config.height = "100%";
      config.events = {
        onAppReady: onAppReady,
        onDocumentStateChange: onDocumentStateChange,
        onRequestEditRights: onRequestEditRights,
        onError: onError,
        onOutdatedVersion: onOutdatedVersion,
        onMakeActionLink: onMakeActionLink,
        onRequestSendNotify: onRequestSendNotify,
        onCollaborativeChanges: onCollaborativeChanges,
        onDocumentReady: onDocumentReady,
        onRequestUsers: onRequestUsers,
      };

      var сonnectEditor = function () {
        docEditor = new DocsAPI.DocEditor(iframeEditor, config);
      };

      if (window.addEventListener) {
        window.addEventListener("load", сonnectEditor);
      } else if (window.attachEvent) {
        window.attachEvent("load", сonnectEditor);
      }

      console.log("hello world")
    },
  },
};
</script>

<style scoped>
</style>
